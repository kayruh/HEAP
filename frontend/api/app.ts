// import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useAppApi() {
    // const { getToken } = useAuth();

    async function getWhatsHot() {
  const res = await api.get('/public/app/getWhatsHot');
    console.log(res.data)
    return res.data;
  }

    async function getEventsBusiness(tags: string[] = []) {
  const res = await api.post('/public/app/getFilterEvent', { tags });
    console.log(res.data)
    return res.data;

  }


  return {
    getWhatsHot,
    getEventsBusiness
  };
}