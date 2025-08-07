import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';
import axios from 'axios';
import { Platform } from 'react-native';

export function useInteractionApi() {
    const { getToken } = useAuth();
    // FOLDERS
    async function getAccountFolders() {
        const token = await getToken({ template: 'integrations' });
        const res = await api.get('/interaction/getAccountFolders', {
        headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    async function insertFolder(folder_name: string , description:  string) {
        const token = await getToken({ template: 'integrations' });
        const res = await api.post('/interaction/insertFolder', {folder_name, description},
            {headers: { Authorization: `Bearer ${token}` }}
        );
        return res.data;
    }

    async function getFolderInfo(username: string , folder_name:  string) {
        const res = await api.post('/interaction/getFolderInfo', {username, folder_name}
        );
        return res.data;
    }

    async function updateFolder(folder_name: string, saved: string[], description: string) {
        const token = await getToken({ template: 'integrations' });
        const res = await api.patch('/interaction/updateFolder',  {folder_name,saved,description},
            {headers: { Authorization: `Bearer ${token}` }}
        );
        return res.data
    }
  //LIKES

    async function insertLikeBusiness(business_username: string) {
        const token = await getToken({ template: 'integrations' });
        const res = await api.post('/interaction/insertLikeBusiness', {business_username},
            {headers: { Authorization: `Bearer ${token}` }}
        );
        return res.data
    }
    async function deleteLikeBusiness(business_username: string) {
    const token = await getToken({ template: 'integrations' });

    const res = await api.delete('/interaction/deleteLikeBusiness', 
        {
        data: { business_username },         
        headers: { Authorization: `Bearer ${token}` },
        }
    );

  return res.data;
}

  async function getBusinessLikeCheck(
    username: string,
    business_username: string,
  ) {
    const res = await api.post('/interaction/getBusinessLikeCheck', {
      username,
      business_username,
    });
    return res.data; // true if liked; backend 404s if not liked
  }

  /* ─────────────── LIKES : EVENT ───────────────────────────────────────── */

  async function insertLikeEvent(event: string) { //event is a uuid code that you get from info
    const token = await getToken({ template: 'integrations' });
    const res = await api.post(
      '/interaction/insertLikeEvent',
      { event },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  }

  async function deleteLikeEvent(event: string) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.delete('/interaction/deleteLikeEvent', {
      data: { event },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  async function getEventLikeCheck(username: string, event: string) {
    const res = await api.post('/interaction/getEventLikeCheck', {
      username,
      event,
    });
    return res.data;
  }

  async function getEventInfo(event: string) {
    const res = await api.get(`/interaction/getEventInfo/${event}`);
    return res.data
  }

  type ReviewUpsertPayload = {
  uuid?: string | null;          // null / undefined → create ; existing UUID → update
  business_username: string;     // PK of the business being reviewed
  review: string;                // the review text body
};

  //uuid,business_username,photo,review
  async function upsertReview(payload: ReviewUpsertPayload) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.put('/interaction/upsertReview', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  async function deleteReview(uuid: string) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.delete('/interaction/deleteReview', {
      data: { uuid },              // controller expects { uuid } in body
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;               // empty (204 No Content)
  }

  async function getAccountReviews(username: string) {
    const res = await api.get(`/interaction/getAccountReviews/${username}`);
    return res.data;
  }

  async function getBusinessReviews(business_username: string) {
    const res = await api.get(
      `/interaction/getBusinessReviews/${business_username}`,
    );
    return res.data;
  }

  async function getBusinessLikeCount(business_username: string) {
    const res = await api.get(`/interaction/getBusinessLikeCount/${business_username}`);
    return res.data
  }

  async function getEventLikeCount(event: string) {
    const res = await api.get(`/interaction/getEventLikeCount/${event}`);
    return res.data
  }

  async function searchProfile(query: string) {
  const q = query?.trim();
  if (!q) return [];

  // encode the query so slashes / spaces don’t break the URL
  const res = await api.get(`/interaction/searchProfile/${encodeURIComponent(q)}`);
  return res.data;          // → [{ username, name, … }, …]
  }

  // async function uploadReviewImage(
  //   review_uuid: string,
  //   fileUri: string,
  //   mime = 'image/jpeg',
  // ) {
  // const token = await getToken({ template: 'integrations' });

  // const form = new FormData();
  // form.append('file', {
  //   uri:  fileUri,
  //   name: 'upload.jpg',
  //   type: mime,
  // } as any);

  // const res = await api.post(`/interaction/uploadReviewImage/${review_uuid}`,form ,{
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   },
  // );
  // return res.data; // { path, publicUrl }
  // }



async function uploadReviewImage(review_uuid: string, fileUri: string) {
  const token = await getToken({ template: 'integrations' });

  /* ↓ RN needs a real file object */
  const form = new FormData();
  form.append('file', {
    uri:
      Platform.OS === 'android'
        ? fileUri.replace('file://', '') 
        : fileUri,                      
    name: fileUri.split('/').pop()!,
    type: 'image/jpeg',                 
  } as any);

  /*  DO NOT set Content-Type – axios/RN will add it with boundary   */
  const res = await api.post(
    `/interaction/uploadReviewImage/${review_uuid}`,
    form,
    {
      headers: { Authorization: `Bearer ${token}` },
      transformRequest: (_, __) => form,   // <-- stops JSON serialization
    }
  );

  return res.data;                         // { path, publicUrl }
}

  async function getReviewImages(review_uuid: string) {
  const res = await api.get(`/interaction/getReviewImage/${review_uuid}`);
  return res.data; // string[]
  }

  async function deleteReviewImage(review_uuid: string, fileName: string) {
  const token = await getToken({ template: 'integrations' });
  const res = await api.delete(`/interaction/deleteReviewImage/${review_uuid}`, {
    data: { fileName },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { message: 'Deleted' }
  }




  /* ─────────────── EXPORTS ─────────────────────────────────────────────── */

  return {
    /* folders */
    getAccountFolders,
    insertFolder,
    getFolderInfo,
    updateFolder,

    /* likes – business */
    insertLikeBusiness,
    deleteLikeBusiness,
    getBusinessLikeCheck,
    getBusinessLikeCount,

    /* likes – event */
    insertLikeEvent,
    deleteLikeEvent,
    getEventLikeCheck,
    getEventLikeCount,

    getEventInfo,

      /* reviews */
    upsertReview,
    deleteReview,
    getAccountReviews,
    getBusinessReviews,
    searchProfile,

    uploadReviewImage,
    getReviewImages,
    deleteReviewImage,
    
    };
}