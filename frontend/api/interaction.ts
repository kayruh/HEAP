import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

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

//   router.post   ('/insertLikeBusiness', clerkexpress.requireAuth(), interactionController.insertLikeBusiness); //secure
//   router.delete('/deleteLikeBusiness',  clerkexpress.requireAuth(), interactionController.deleteLikeBusiness); //secure
//   router.get   ('/getBusinessLikeCount/:business_username', interactionController.getBusinessLikeCount); 
  
  
//   router.post   ('/insertLikeEvent', clerkexpress.requireAuth(),  interactionController.insertLikeEvent); //secure
//   router.delete('/deleteLikeEvent', clerkexpress.requireAuth(), interactionController.deleteLikeEvent); //secure
//   router.get   ('/getEventLikeCount/:event', interactionController.getEventLikeCount); 
    async function insertLikeBusiness(business_username: string) {
        const token = await getToken({ template: 'integrations' });
        const res = await api.post('/insertLikeBusiness', {business_username},
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

  async function insertLikeEvent(event: string) {
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

    /* likes – event */
    insertLikeEvent,
    deleteLikeEvent,
    getEventLikeCheck,
  };
}