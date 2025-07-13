const { supabase } = require("../db/supabase");
//need to change the show to either add get an event created by a business or show the business itself
//users can like and save events and businesses?

module.exports = {
async whatsHot(limit = 6, days = 30) {
  const { data, error } = await supabase
    .rpc('get_top_events', { p_limit: limit, p_days: days })

  if (error) throw new Error(error.message)
  return data || []
},

async getOngoingEventsAndBusinesses(filterTags = []) {
  const now      = new Date().toISOString()
  // compute one-month-from-now
  const oneMonth = new Date()
  oneMonth.setMonth(oneMonth.getMonth() + 1)
  const oneMonthISO = oneMonth.toISOString()

  // 1) If tag filters provided, pre-fetch matching business usernames
  let bizMatch = null
  if (filterTags.length) {
    const { data: bizList, error: bizErr } = await supabase
      .from('BUSINESS')
      .select('username')
      .overlaps('tags', filterTags)    // array‐overlap on tags
    if (bizErr) throw new Error(bizErr.message)
    bizMatch = bizList.map(b => b.username)
    if (!bizMatch.length) {
      // no businesses match those tags → nothing to show
      return []
    }
  }

  // 2a) Pull events starting between now and one month from now,
  //    optionally restricted to bizMatch[]
  let evQ = supabase
    .from('EVENT')
    .select('uuid, title, description, start, end, username')
    .gte('start', now)
    .lte('start', oneMonthISO)

  if (bizMatch) {
    const inList = bizMatch.map(u => `'${u}'`).join(',')
    evQ = evQ.in('username', `(${inList})`)
  }

  const { data: events, error: evErr } = await evQ
  if (evErr) throw new Error(evErr.message)

  // 2b) Figure out which businesses still have no events
  const usedBiz = new Set(events.map(e => e.username))

  let bizQ = supabase
    .from('BUSINESS')
    .select(
      'username, name, google_maps_location, ' +
      'street_no, street_name, unit_no, postal, tags, description'
    )

  if (bizMatch) {
    const inList = bizMatch.map(u => `'${u}'`).join(',')
    bizQ = bizQ.in('username', `(${inList})`)
  }

  if (usedBiz.size) {
    const notList = Array.from(usedBiz).map(u => `'${u}'`).join(',')
    bizQ = bizQ.not('username', 'in', `(${notList})`)
  }

  const { data: businesses, error: bErr } = await bizQ
  if (bErr) throw new Error(bErr.message)

  // 3) Merge into a single array
  const asEvents = events.map(e => ({
    type: 'event',
    uuid: e.uuid,
    title: e.title,
    description: e.description,
    start: e.start,
    end: e.end,
    business_username: e.username
  }))

  const asBiz = businesses.map(b => ({
    type: 'business',
    username: b.username,
    name: b.name,
    google_maps_location: b.google_maps_location,
    street_no: b.street_no,
    street_name: b.street_name,
    unit_no: b.unit_no,
    postal: b.postal,
    tags: b.tags,
    description: b.description
  }))

  return [...asEvents, ...asBiz]
}
}
