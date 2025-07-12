// frontend/api/business.tsx
import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useBusinessApi() {
  const { getToken } = useAuth();

  /** Public: no auth required */
  async function getBusinessInfo(username: string) {
    const res = await api.get(`/business/getBusinessInfo/${username}`);
    return res.data;
  }

  /** Protected: needs a Clerk session */
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

  /** Protected: upsert (create/update) an event */
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

  /** Protected: delete an event by UUID */
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

  /** Public (or authenticated) fetching the list of events for a business */
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
