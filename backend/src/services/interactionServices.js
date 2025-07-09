const { getAccountReviews, getBusinessReviews } = require("../controllers/interactionController");
const { supabase } = require("../db/supabase");

module.exports = {
/* ---------- Likes ---------- */
    async upsertLike(username,  business_username) {
    const { error } = await supabase
        .from('LIKES')
        .upsert({ username,  business_username }, { onConflict: 'username, business_username' });
    if (error) throw new Error(error.message);
    },

    async deleteLike(username,  business_username) {
    const { data, error } = await supabase
        .from('LIKES')
        .delete()
        .eq('username', username)
        .eq(' business_username',  business_username)
        .select('*')
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
    },

    async getAccountLikes(username) {
    const { data, error } = await supabase
        .from('LIKES')
        .select(' business_username')
        .eq('username', username);
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessLikes( business_username) {
    const { data, error } = await supabase
        .from('LIKES')
        .select('username')
        .eq(' business_username',  business_username);
    if (error) throw new Error(error.message);
    return data;
    },

    /* ---------- Folders ---------- */
    async upsertFolder(
    username,
    folder_name,
    saved //saved must be an array
    ) {
    const { error } = await supabase
        .from('FOLDERS')
        .upsert({username, folder_name, saved}, { onConflict: 'username,folder_name' });
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

    async getBusinessReviews( business_username) {
    const { data, error } = await supabase
        .from('REVIEWS')
        .select('*')
        .eq(' business_username',  business_username);
    if (error) throw new Error(error.message);
    return data;
    },

  
}