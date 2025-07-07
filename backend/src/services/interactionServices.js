import { supabase } from '../config/supabaseClient';

/* ---------- Likes ---------- */
export const upsertLike = async (clerk_id: string, business_clerk_id: string) => {
  const { error } = await supabase
    .from('LIKES')
    .upsert({ clerk_id, business_clerk_id }, { onConflict: 'clerk_id,business_clerk_id' });
  if (error) throw new Error(error.message);
};

export const deleteLike = async (clerk_id: string, business_clerk_id: string) => {
  const { data, error } = await supabase
    .from('LIKES')
    .delete()
    .eq('clerk_id', clerk_id)
    .eq('business_clerk_id', business_clerk_id)
    .select('*')
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
};

export const getAccountLikes = async (clerk_id: string) => {
  const { data, error } = await supabase
    .from('LIKES')
    .select('business_clerk_id')
    .eq('clerk_id', clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

export const getBusinessLikes = async (business_clerk_id: string) => {
  const { data, error } = await supabase
    .from('LIKES')
    .select('clerk_id')
    .eq('business_clerk_id', business_clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

/* ---------- Folders ---------- */
export const upsertFolder = async (payload: {
  clerk_id: string;
  folder_name: string;
  saved?: string[];
}) => {
  const { error } = await supabase
    .from('FOLDERS')
    .upsert(payload, { onConflict: 'clerk_id,folder_name' });
  if (error) throw new Error(error.message);
};

export const deleteFolder = async (clerk_id: string, folder_name: string) => {
  const { error } = await supabase
    .from('FOLDERS')
    .delete()
    .eq('clerk_id', clerk_id)
    .eq('folder_name', folder_name);
  if (error) throw new Error(error.message);
};

export const getAccountFolders = async (clerk_id: string) => {
  const { data, error } = await supabase
    .from('FOLDERS')
    .select('*')
    .eq('clerk_id', clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

/* ---------- Photos ---------- */
export const upsertPhotos = async (payload: {
  uuid: string;
  business_clerk_id: string;
  clerk_id: string;
  photo: string;
}) => {
  const { error } = await supabase.from('PHOTOS').upsert(payload);
  if (error) throw new Error(error.message);
};

export const deletePhotos = async (uuid: string) => {
  const { error } = await supabase.from('PHOTOS').delete().eq('uuid', uuid);
  if (error) throw new Error(error.message);
};

export const getAccountPhotos = async (clerk_id: string) => {
  const { data, error } = await supabase
    .from('PHOTOS')
    .select('*')
    .eq('clerk_id', clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

export const getBusinessPhotos = async (business_clerk_id: string) => {
  const { data, error } = await supabase
    .from('PHOTOS')
    .select('*')
    .eq('business_clerk_id', business_clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

/* ---------- Reviews ---------- */
export const upsertReviews = async (payload: {
  uuid: string;
  business_clerk_id: string;
  clerk_id: string;
  review: string;
}) => {
  const { error } = await supabase.from('REVIEW').upsert(payload);
  if (error) throw new Error(error.message);
};

export const deleteReviews = async (uuid: string) => {
  const { error } = await supabase.from('REVIEW').delete().eq('uuid', uuid);
  if (error) throw new Error(error.message);
};

export const getAccountReviews = async (clerk_id: string) => {
  const { data, error } = await supabase
    .from('REVIEW')
    .select('*')
    .eq('clerk_id', clerk_id);
  if (error) throw new Error(error.message);
  return data;
};

export const getBusinessReviews = async (business_clerk_id: string) => {
  const { data, error } = await supabase
    .from('REVIEW')
    .select('*')
    .eq('business_clerk_id', business_clerk_id);
  if (error) throw new Error(error.message);
  return data;
};
