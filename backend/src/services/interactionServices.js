
const { supabase } = require("../db/supabase");

module.exports = {
/* ---------- Likes ---------- */
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
    saved, //saved must be an array
    description
    ) {
    const { error } = await supabase
        .from('FOLDERS')
        .insert({username, folder_name, saved, description});
    // if (error) {console.log(error.code)}
    if (error) {
    // Postgres duplicate-key violation
    if (error.code === '23505') {
      const dupErr       = new Error('Folder name already exists.');
      dupErr.httpStatus  = 409;          
      throw dupErr;
    }
    throw error;                      
  };
    },

    async updateFolder(
    username,
    folder_name,
    saved, //saved must be an array
    description
    ) {
    const { error } = await supabase
        .from('FOLDERS')
        .update({username, folder_name, saved, description})
        .eq("username", username)
        .eq("folder_name", folder_name);
    if (error) throw new Error(error.message);
    },

    async deleteFolder(username, folder_name) {
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
        .select('*')
        .eq('username', username);
    if (error) throw new Error(error.message);
    return data;
    },

    async getFolderInfo(username, folder_name){
    const { data, error } = await supabase
        .from('FOLDERS')
        .select('*')
        .eq('username', username)
        .eq('folder_name', folder_name)
        .single();

    if (error) throw new Error(error.message);
    return data;
    },

    /* ---------- Reviews ---------- */
    async upsertReview(uuid, business_username,username,photo,review) {
    const { error } = await supabase
        .from('REVIEWS')
        .upsert({uuid,
         business_username,
        username,
        photo,
        review}, {onConflict: 'uuid'}); // photo as an array
    if (error) throw new Error(error.message);
    },

    async deleteReview(uuid) {
    const { error } = await supabase.from('REVIEWS').delete().eq('uuid', uuid);
    if (error) throw new Error(error.message);
    },

    async getAccountReviews(username) {
    const { data, error } = await supabase
        .from('REVIEWS')
        .select('*')
        .eq('username', username);
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessReviews(business_username) {
    const { data, error } = await supabase
        .from('REVIEWS')
        .select('*')
        .eq('business_username',  business_username);
    if (error) throw new Error(error.message);
    return data;
    },

  
}