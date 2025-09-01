
const { supabase } = require("../db/supabase");
const { v4 } = require('uuid');
const uuidv4 = v4;

module.exports = {
/* ---------- Likes ---------- */
   async searchProfile(query) {
  const term = (query || '').trim();
  if (!term) return [];                               // empty search → nothing

  // match username OR name OR description (ILIKE)
  // …or match tags array (contains element)
  const { data, error } = await supabase
    .from('BUSINESS')
    .select(
      'username, name, google_maps_location, street_no, street_name,' +
      'unit_no, postal, tags, description'
    )
    .or(
      [
        `username.ilike.%${term}%`,
        `name.ilike.%${term}%`,
        `description.ilike.%${term}%`,
        `tags.cs.{${term}}`
      ].join(',')
    );

  if (error) throw new Error(error.message);
  return data || [];
},

    async insertLikeBusiness(username,  business_username) {
    const { error } = await supabase
        .from('LIKE_BUSINESS')
        .insert({ username, business_username }, { onConflict: 'username, business_username' });
    if (error) throw new Error(error.message);
    },

    async deleteLikeBusiness(username, business_username) {
    const { data, error } = await supabase
        .from('LIKE_BUSINESS')
        .delete()
        .eq('username', username)
        .eq('business_username', business_username)
        .select('*')
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessLikeCount(business_username) {
    const { data, count, error } = await supabase
        .from('LIKE_BUSINESS')
        .select('*',{head: true, count: 'exact'})
        .eq('business_username', business_username);

    // console.log(business_username, count)

    if (error) throw new Error(error.message);
    return count;
    },

    async getBusinessLikeCheck(username, business_username) {
      // console.log(username, business_username)
    const { data, error } = await supabase
      .from('LIKE_BUSINESS')
      .select('*')
      .eq('business_username', business_username)
      .eq('username', username)
      .single();
    
    if (error) {
    if (error.code === 'PGRST116') {
      const notFound       = new Error('Like not found');
      notFound.httpStatus  = 404;          
      throw notFound;
    }
    throw error;                      
    };
    return data;
    },

    async insertLikeEvent(username,  event) {
    const { error } = await supabase
        .from('LIKE_EVENT')
        .insert({ username, event }, { onConflict: 'username, event' });
    if (error) throw new Error(error.message);
    },

    async deleteLikeEvent(username, event) {
    const { data, error } = await supabase
        .from('LIKE_EVENT')
        .delete()
        .eq('username', username)
        .eq('event', event)
        .select('*')
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
    },

    async getEventLikeCount( event ) {
    const { data, count, error } = await supabase
        .from('LIKE_EVENT')
        .select('*',{head: true, count: 'exact'})
        .eq('event', event);

    if (error) throw new Error(error.message);
    return count;
    },

    async getEventLikeCheck(username, event) {
  // console.log(username, business_username)
    const { data, error } = await supabase
      .from('LIKE_EVENT')
      .select('*')
      .eq('event', event)
      .eq('username', username)
      .single();
    
    if (error) {
    if (error.code === 'PGRST116') {
      const notFound       = new Error('Like not found');
      notFound.httpStatus  = 404;          
      throw notFound;
    }
    throw error;                      
    };
    return data;
    },

  //   async getAccountLikes(username) { //change this to get info for like_business and like_event
  //     const { data: bizLikes, error: bizErr } = await supabase
  //   .from('LIKE_BUSINESS')
  //   .select('business_username, created_at')
  //   .eq('username', username)

  // // 2) fetch event likes
  // const { data: evtLikes, error: evtErr } = await supabase
  //   .from('LIKE_EVENT')
  //   .select('event, created_at')
  //   .eq('username', username)

  // // 3) error handling
  // if (bizErr || evtErr) {
  //   const msgs = [bizErr?.message, evtErr?.message].filter(Boolean).join('; ')
  //   throw new Error(`Failed to load likes: ${msgs}`)
  // }

  // // 4) normalize and merge
  // const formattedBiz = (bizLikes || []).map(like => ({
  //   type: 'business',
  //   target: like.business_username,
  //   created_at: like.created_at,
  // }))

  // const formattedEvt = (evtLikes || []).map(like => ({
  //   type: 'event',
  //   target: like.event,
  //   created_at: like.created_at,
  // }))

  // // 5) sort by newest first (optional)
  // return [...formattedBiz, ...formattedEvt].sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )
  //   },



    /* ---------- Folders ---------- */
    async insertFolder(
    username,
    folder_name,
    saved, // array of business usernames
    description
    ) {
    // 1) create folder metadata only
    const { error: fErr } = await supabase
        .from('FOLDERS')
        .insert({ username, folder_name, description });
    if (fErr) {
      if (fErr.code === '23505') {
        const dupErr = new Error('Folder name already exists.');
        dupErr.httpStatus = 409;
        throw dupErr;
      }
      throw fErr;
    }

    // 2) optional: seed items
    const items = (saved || []).map((biz) => ({
      username,
      folder_name,
      item_type: 'business',
      item_id: biz,
    }));
    if (items.length) {
      const { error: iErr } = await supabase.from('FOLDER_ITEMS').insert(items, { onConflict: 'username,folder_name,item_type,item_id' });
      if (iErr) throw iErr;
    }
    },

    async updateFolder(
    username,
    folder_name,
    saved, // array of business usernames
    description
    ) {
    // 1) update metadata
    const { error: uErr } = await supabase
        .from('FOLDERS')
        .update({ description })
        .eq('username', username)
        .eq('folder_name', folder_name);
    if (uErr) throw new Error(uErr.message);

    // 2) sync items: fetch current, then diff
    const { data: current, error: cErr } = await supabase
      .from('FOLDER_ITEMS')
      .select('item_id')
      .eq('username', username)
      .eq('folder_name', folder_name)
      .eq('item_type', 'business');
    if (cErr) throw new Error(cErr.message);

    const curSet = new Set((current || []).map(r => r.item_id));
    const newSet = new Set(saved || []);

    const toInsert = [...newSet].filter(x => !curSet.has(x)).map(item_id => ({
      username,
      folder_name,
      item_type: 'business',
      item_id,
    }));
    const toDelete = [...curSet].filter(x => !newSet.has(x));

    if (toInsert.length) {
      const { error: iErr } = await supabase.from('FOLDER_ITEMS').insert(toInsert);
      if (iErr) throw new Error(iErr.message);
    }

    if (toDelete.length) {
      const { error: dErr } = await supabase
        .from('FOLDER_ITEMS')
        .delete()
        .eq('username', username)
        .eq('folder_name', folder_name)
        .eq('item_type', 'business')
        .in('item_id', toDelete);
      if (dErr) throw new Error(dErr.message);
    }
    },

    async deleteFolder(username, folder_name) {
    // delete items first for safety
    const { error: iErr } = await supabase
      .from('FOLDER_ITEMS')
      .delete()
      .eq('username', username)
      .eq('folder_name', folder_name);
    if (iErr) throw new Error(iErr.message);

    const { error } = await supabase
        .from('FOLDERS')
        .delete()
        .eq('username', username)
        .eq('folder_name', folder_name);
    if (error) throw new Error(error.message);
    },

  async getAccountFolders(username){
  const { data, error } = await supabase
    .from('FOLDERS')
    .select('folder_name, description, created_at, is_public, share_id, allow_collaboration')
    .eq('username', username)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
  },

    async getFolderInfo(username, folder_name){
    // folder metadata
    const { data: folder, error: fErr } = await supabase
        .from('FOLDERS')
        .select('username, folder_name, description, is_public, created_at')
        .eq('username', username)
        .eq('folder_name', folder_name)
        .single();
    if (fErr) throw new Error(fErr.message);

    // items
    const { data: items, error: iErr } = await supabase
      .from('FOLDER_ITEMS')
      .select('item_type, item_id')
      .eq('username', username)
      .eq('folder_name', folder_name);
    if (iErr) throw new Error(iErr.message);

    // Preserve old contract: saved: string[] of usernames (business only for now)
    const saved = (items || [])
      .filter(it => it.item_type === 'business')
      .map(it => it.item_id);

    return { ...folder, saved };
    },

    /* ---------- Reviews ---------- */
    async upsertReview(uuid, business_username,username,review) {
    const { data, error } = await supabase
        .from('REVIEWS')
        .upsert({uuid,
         business_username,
        username,
        review}, {onConflict: 'uuid'})
        .select("*")
        .maybeSingle(); // photo as an array
    if (error) throw new Error(error.message);
    return data
  },

    async deleteReview(uuid, username) {
    const { error } = await supabase.from('REVIEWS').delete().eq('uuid', uuid).eq('username', username);
    if (error) throw new Error(error.message);
    },

  async getAccountReviews(username) {
  const { data, error } = await supabase
    .from('REVIEWS')
    .select('uuid, username, business_username, review, created_at, event_uuid')
    .eq('username', username)
    .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
    },

  async getBusinessReviews(business_username) {
  const { data, error } = await supabase
    .from('REVIEWS')
    .select('uuid, username, business_username, review, created_at, event_uuid')
    .eq('business_username',  business_username)
    .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
    },

    async getEventInfo(event) {
      const {data, error} = await supabase
      .from("EVENT")
      .select('uuid, username, title, description, start, end, address, latitude, longitude')
      .eq("uuid", event)
      .single()
    if (error) throw new Error(error.message);
    return data
    },

        async checkReviewer(username, review_uuid) {
            const { data, error} = await supabase
                .from("REVIEWS")
                .select("*")
                .eq("username", username)
                .eq("uuid",review_uuid)
                .maybeSingle()
            if (error) throw new Error(error.message);
            return data
        },
    
        async uploadReviewImage(review_uuid, fileBuffer, mime) {
            const filePath = `${review_uuid}/${uuidv4()}`;
            const { data, error } = await supabase.storage
            .from('review-images')
            .upload(filePath, fileBuffer, { contentType: mime });
    
            if (error) throw new Error(error.message);
    
            const { data: urlData } = supabase.storage
            .from('review-images')
            .getPublicUrl(filePath);            // bucket public; use signed URL if private
    
        return { ...data, publicUrl: urlData.publicUrl };
        },
    
        async getReviewImage(review_uuid) {
            // console.log("hit service")
            const { data, error } = await supabase.storage
                .from('review-images')
                .list(`${review_uuid}/`);
            // console.log(data)
            if (error) throw new Error(error.message);
    
            return data.map((f) => {
                const { data: url } = supabase.storage
                .from('review-images')
                .getPublicUrl(`${review_uuid}/${f.name}`);
                return url.publicUrl;
            });
        },
        
        async deleteReviewImage(review_uuid, fileName) {
            const fullPath = `${review_uuid}/${fileName}`; // same pattern as uploads
    
            const { data, error } = await supabase.storage
                .from('review-images')
                .remove([fullPath]);                      // expects array
    
            if (error) throw new Error(error.message);
            return data;
        },   
  

  
}