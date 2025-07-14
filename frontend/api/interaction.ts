import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useInteractionApi() {
  const { getToken } = useAuth();

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

  // idk how to implement this removeFromFolder for fav page
  // const removeFromFolder = async (folderName: string, itemId: string) => {
  //   const headers = await getHeaders();
  //   const res = await axios.delete(`${API_URL}/folders/${encodeURIComponent(folderName)}/item/${itemId}`, {
  //     headers,
  //   });
  //   return res.data;
  // };

  
  return {
    getAccountFolders,
    insertFolder,
    // removeFromFolder,
    // test
  };
}