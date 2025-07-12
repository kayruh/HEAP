
const { supabase } = require("../db/supabase");

module.exports = {
/* ---------- Likes ---------- */
    async upsertLikeBusiness(username,  business_username) {
    const { error } = await supabase
        .from('LIKE_BUSINESS')
        .upsert({ username, business_username }, { onConflict: 'username, business_username' });
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

    async upsertLikeEvent(username,  event) {
    const { error } = await supabase
        .from('LIKE_EVENT')
        .upsert({ username, event }, { onConflict: 'username, event' });
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

    // console.log(business_username, count)

    if (error) throw new Error(error.message);
    return count;
    },

    async getAccountLikes(username) { //change this to get info for like_business and like_event
      const { data: bizLikes, error: bizErr } = await supabase
    .from('LIKE_BUSINESS')
    .select('business_username, created_at')
    .eq('username', username)

  // 2) fetch event likes
  const { data: evtLikes, error: evtErr } = await supabase
    .from('LIKE_EVENT')
    .select('event, created_at')
    .eq('username', username)

  // 3) error handling
  if (bizErr || evtErr) {
    const msgs = [bizErr?.message, evtErr?.message].filter(Boolean).join('; ')
    throw new Error(`Failed to load likes: ${msgs}`)
  }

  // 4) normalize and merge
  const formattedBiz = (bizLikes || []).map(like => ({
    type: 'business',
    target: like.business_username,
    created_at: like.created_at,
  }))

  const formattedEvt = (evtLikes || []).map(like => ({
    type: 'event',
    target: like.event,
    created_at: like.created_at,
  }))

  // 5) sort by newest first (optional)
  return [...formattedBiz, ...formattedEvt].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
    },



    /* ---------- Folders ---------- */
    async upsertFolder(
    username,
    folder_name,
    saved, //saved must be an array
    description
    ) {
    const { error } = await supabase
        .from('FOLDERS')
        .upsert({username, folder_name, saved, description}, { onConflict: 'username,folder_name' });
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
        .eq(' business_username',  business_username);
    if (error) throw new Error(error.message);
    return data;
    },

  
}