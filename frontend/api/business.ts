// frontend/api/business.ts
import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useBusinessApi() {
  const { getToken } = useAuth();


  async function getBusinessInfo(username: string) {
    const res = await api.get(`/business/getBusinessInfo/${username}`);
    return res.data;
  }


  async function updateBusinessDisplay(
    display_id: string,
    picture_array: string[]
  ) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.patch(
      '/business/updateBusinessDisplay',
      { display_id, picture_array },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }


  async function upsertEvent(event: {
    uuid?: string;
    title: string;
    description: string;
    start: string;
    end: string;
    event_photos: string[];
  }) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.put(
      '/business/upsertEvent',
      event,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }

  async function deleteEvent(uuid: string) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.delete(
      '/business/deleteEvent',
      {
        data: { uuid },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  }

  async function getEvents(username: string) {
    const res = await api.get(`/business/getEvents/${username}`);
    return res.data;
  }

  return {
    getBusinessInfo,
    updateBusinessDisplay,
    upsertEvent,
    deleteEvent,
    getEvents
  };
}
