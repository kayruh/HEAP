import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useClerkApi() {
  const { getToken } = useAuth();

  async function getAvatar(username: string) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.get(`/clerk/getAvatar/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  return {
    getAvatar
  };
}