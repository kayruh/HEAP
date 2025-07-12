// import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useAppApi() {
    // const { getToken } = useAuth();

    async function getWhatsHot() {
    const res = await api.get('/app/getWhatsHot');
    return res.data;
  }
  return {
    getWhatsHot
  };
}