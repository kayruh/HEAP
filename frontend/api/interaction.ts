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

  
  return {
    getAccountFolders
  };
}