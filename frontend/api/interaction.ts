import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useInteractionApi() {
  const { getToken } = useAuth();

  async function getAccountFolders() {
    // const token = await getToken({ template: 'integrations' });
    // console.log(username)
    const res = await api.get('/interaction/getAccountFolders')
    return res.data
  }

  
  return {
    getAccountFolders
  };
}