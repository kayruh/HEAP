const { supabase } = require("../db/supabase");
//need to change the show to either add get an event created by a business or show the business itself
//users can like and save events and businesses?
const toPgList = arr => `(${arr.map(u => `"${u}"`).join(',')})`;

module.exports = {
async whatsHot(limit = 6, days = 30) {
  const { data, error } = await supabase
    .rpc('get_top_events', { p_limit: limit, p_days: days })

  if (error) throw new Error(error.message)
  return data || []
},


// async getOngoingEventsAndBusinesses(filterTags = []) {

//   const nowISO      = new Date().toISOString();
//   const oneMonthISO = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

 
//   let bizMatch = null;
//   if (filterTags.length) {
//     const { data, error } = await supabase
//       .from('BUSINESS')
//       .select('username')
//       .overlaps('tags', filterTags);
//     if (error) throw error;

//     bizMatch = data.map(b => b.username);
//     if (!bizMatch.length) return [];           // nothing matches the tags
//   }

//   let usedBiz = [];
//   {
//     let q = supabase.from('EVENT').select('username');
//     if (bizMatch) q = q.in('username', bizMatch);

//     const { data, error } = await q;
//     if (error) throw error;

//     usedBiz = [...new Set(data.map(e => e.username))];   // de-dupe
//   }

//   let evQ = supabase
//     .from('EVENT')
//     .select('uuid, title, description, start, end, username')
//     .or(`and(start.gte.${nowISO},start.lte.${oneMonthISO}),end.is.null`)
//     .order('start', { ascending: true, nulls: 'last' });

//   if (bizMatch) evQ = evQ.in('username', bizMatch);

//   const { data: events, error: evErr } = await evQ;
//   if (evErr) throw evErr;

//   let bizQ = supabase
//     .from('BUSINESS')
//     .select(
//       'username, name, google_maps_location, street_no, street_name,' +
//       'unit_no, postal, tags, description'
//     );

//   if (bizMatch) bizQ = bizQ.in('username', bizMatch);
//   if (usedBiz.length) bizQ = bizQ.not('username', 'in', toPgList(usedBiz));

//   const { data: businesses, error: bizErr } = await bizQ;
//   if (bizErr) throw bizErr;

//   const asEvents = (events ?? []).map(e => ({
//     type: 'event',
//     uuid: e.uuid,
//     title: e.title,
//     description: e.description,
//     start: e.start,
//     end: e.end,
//     business_username: e.username,
//   }));

//   const asBiz = (businesses ?? []).map(b => ({
//     type: 'business',
//     username: b.username,
//     name: b.name,
//     google_maps_location: b.google_maps_location,
//     street_no: b.street_no,
//     street_name: b.street_name,
//     unit_no: b.unit_no,
//     postal: b.postal,
//     tags: b.tags,
//     description: b.description,
//   }));

//   return [...asEvents, ...asBiz];              // events already sorted
// }
async getOngoingEventsAndBusinesses(filterTags = []) {
    /* helper lives INSIDE the function, so it’s in scope */
    async function getCover(bucket, prefix) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(`${prefix}/`, {
          limit: 1,
          sortBy: { column: 'name', order: 'asc' } // deterministic pick
        });

      if (error || !data || !data.length) return null;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${prefix}/${data[0].name}`);

      return urlData ? urlData.publicUrl : null;
    }

    const nowISO      = new Date().toISOString();
    const oneMonthISO = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    /* ── tag filter -------------------------------------------------- */
    let bizMatch = null;
    if (filterTags.length) {
      const { data, error } = await supabase
        .from('BUSINESS')
        .select('username')
        .overlaps('tags', filterTags);

      if (error) throw error;

      bizMatch = data.map(b => b.username);
      if (!bizMatch.length) return [];
    }

    /* ── businesses that already have events ------------------------ */
    let usedBiz = [];
    {
      let q = supabase.from('EVENT').select('username');
      if (bizMatch) q = q.in('username', bizMatch);

      const { data, error } = await q;
      if (error) throw error;

      usedBiz = Array.from(new Set(data.map(e => e.username)));
    }

    /* ── EVENTS within next 30 days or open-ended ------------------- */
    let evQ = supabase
      .from('EVENT')
      .select('uuid, title, description, start, end, username')
      .or(`and(start.gte.${nowISO},start.lte.${oneMonthISO}),end.is.null`)
      .order('start', { ascending: true, nulls: 'last' });

    if (bizMatch) evQ = evQ.in('username', bizMatch);

    const { data: events, error: evErr } = await evQ;
    if (evErr) throw evErr;

    /* ── BUSINESSES without an event in that window ----------------- */
    let bizQ = supabase
      .from('BUSINESS')
      .select(
        'username, name, google_maps_location, street_no, street_name,' +
        'unit_no, postal, tags, description'
      );

    if (bizMatch) bizQ = bizQ.in('username', bizMatch);
    if (usedBiz.length) bizQ = bizQ.not('username', 'in', toPgList(usedBiz));

    const { data: businesses, error: bizErr } = await bizQ;
    if (bizErr) throw bizErr;

    /* ── cover images (in parallel) --------------------------------- */
    const eventCovers = await Promise.all(
      (events || []).map(e => getCover('event-image', e.uuid))
    );

    const bizCovers = await Promise.all(
      (businesses || []).map(b => getCover('business-image', b.username))
    );

    /* ── shape output ------------------------------------------------ */
    const asEvents = (events || []).map((e, i) => ({
      type: 'event',
      uuid: e.uuid,
      title: e.title,
      description: e.description,
      start: e.start,
      end: e.end,
      business_username: e.username,
      cover_url: eventCovers[i] || null
    }));

    const asBiz = (businesses || []).map((b, i) => ({
      type: 'business',
      username: b.username,
      name: b.name,
      google_maps_location: b.google_maps_location,
      street_no: b.street_no,
      street_name: b.street_name,
      unit_no: b.unit_no,
      postal: b.postal,
      tags: b.tags,
      description: b.description,
      cover_url: bizCovers[i] || null
    }));

    /* events already sorted by start ASC */
    return [...asEvents, ...asBiz];
  }
}
