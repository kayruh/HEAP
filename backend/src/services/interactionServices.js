const { supabase } = require("../db/supabase");

module.exports = {
/* ---------- Likes ---------- */
    async upsertLike(clerk_id, business_clerk_id) {
    const { error } = await supabase
        .from('LIKES')
        .upsert({ clerk_id, business_clerk_id }, { onConflict: 'clerk_id,business_clerk_id' });
    if (error) throw new Error(error.message);
    },

    async deleteLike(clerk_id, business_clerk_id) {
    const { data, error } = await supabase
        .from('LIKES')
        .delete()
        .eq('clerk_id', clerk_id)
        .eq('business_clerk_id', business_clerk_id)
        .select('*')
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
    },

    async getAccountLikes(clerk_id) {
    const { data, error } = await supabase
        .from('LIKES')
        .select('business_clerk_id')
        .eq('clerk_id', clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessLikes(business_clerk_id) {
    const { data, error } = await supabase
        .from('LIKES')
        .select('clerk_id')
        .eq('business_clerk_id', business_clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    /* ---------- Folders ---------- */
    async upsertFolder(
    clerk_id,
    folder_name,
    saved //saved must an array
    ) {
    const { error } = await supabase
        .from('FOLDERS')
        .upsert({clerk_id, folder_name, saved}, { onConflict: 'clerk_id,folder_name' });
    if (error) throw new Error(error.message);
    },

    async deleteFolder(clerk_id, folder_name) {
    const { error } = await supabase
        .from('FOLDERS')
        .delete()
        .eq('clerk_id', clerk_id)
        .eq('folder_name', folder_name);
    if (error) throw new Error(error.message);
    },

    async getAccountFolders(clerk_id){
    const { data, error } = await supabase
        .from('FOLDERS')
        .select('*')
        .eq('clerk_id', clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    /* ---------- Photos ---------- */
    async upsertPhotos(uuid,business_clerk_id,clerk_id,photo) {
    const { error } = await supabase
        .from('PHOTOS')
        .upsert({uuid,
        business_clerk_id,
        clerk_id,
        photo}, {onConflict: 'business_clerk_id,uuid'}); // photo as an array
    if (error) throw new Error(error.message);
    },

    async deletePhotos(uuid) {
    const { error } = await supabase.from('PHOTOS').delete().eq('uuid', uuid);
    if (error) throw new Error(error.message);
    },

    async getAccountPhotos(clerk_id) {
    const { data, error } = await supabase
        .from('PHOTOS')
        .select('*')
        .eq('clerk_id', clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessPhotos(business_clerk_id) {
    const { data, error } = await supabase
        .from('PHOTOS')
        .select('*')
        .eq('business_clerk_id', business_clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    /* ---------- Reviews ---------- */
    async upsertReviews(
    uuid,
    business_clerk_id,
    clerk_id,
    review
    ){
    const { error } = await supabase.from('REVIEW').upsert({uuid, business_clerk_id, clerk_id, review}, {onConflict: 'business_clerk_id,uuid'});
    if (error) throw new Error(error.message);
    },

    async deleteReviews(uuid) {
    const { error } = await supabase.from('REVIEW').delete().eq('uuid', uuid);
    if (error) throw new Error(error.message);
    },

    async getAccountReviews(clerk_id) {
    const { data, error } = await supabase
        .from('REVIEW')
        .select('*')
        .eq('clerk_id', clerk_id);
    if (error) throw new Error(error.message);
    return data;
    },

    async getBusinessReviews(business_clerk_id) {
    const { data, error } = await supabase
        .from('REVIEW')
        .select('*')
        .eq('business_clerk_id', business_clerk_id);
    if (error) throw new Error(error.message);
    return data;
    }

}