// frontend/api/business.ts
import { useAuth } from '@clerk/clerk-expo';
import { api } from './index';

export function useBusinessApi() {
  const { getToken } = useAuth();


  async function getBusinessInfo(username: string) {
    const res = await api.get(`/business/getBusinessInfo/${username}`);
    return res.data;
  }

  async function upsertEvent(event: {
    uuid?: string;
    title: string;
    description: string;
    start: string;
    end: string;
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

  async function uploadBusinessImage(fileUri: string, mime = 'image/jpeg') {
  const token = await getToken({ template: 'integrations' });

  const form = new FormData();
  form.append('file', {
    uri: fileUri,
    name: 'upload.jpg',
    type: mime,
  } as any);                         // 👈 RN needs the explicit cast

  const res = await api.post('/business/uploadBusinessImage', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;                   // -> { path, publicUrl }
  }

  async function getBusinessImages(username: string) {
  const res = await api.get(`/business/getBusinessImage/${username}`);
  return res.data;                   // -> [publicUrl, …]
  }

  async function deleteBusinessImage(fileName: string) {
  // fileName is just "3fcd3acc-74d8-4dba-88ff-0e5017c5e29b.jpg"
  const token = await getToken({ template: 'integrations' });

  const res = await api.delete('/business/deleteBusinessImage', {
    data: { fileName },                         // goes in req.body
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data; // { message: 'Deleted' }
}

async function uploadEventImage(
    eventUuid: string,
    fileUri: string,
    mime = 'image/jpeg',
  ) {
    const token = await getToken({ template: 'integrations' });

    const form = new FormData();
    form.append('file', {
      uri:  fileUri,
      name: 'upload.jpg',
      type: mime,
    } as any);

    const res = await api.post(
      `/business/uploadEventImage/${eventUuid}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data; // { path, publicUrl }
  }

  /** GET /business/getEventImage/:event_uuid */
  async function getEventImages(eventUuid: string) {
    const res = await api.get(`/business/getEventImage/${eventUuid}`);
    return res.data; // string[]
  }

  /** DELETE /business/deleteEventImage/:event_uuid  body = { fileName } */
  async function deleteEventImage(eventUuid: string, fileName: string) {
    const token = await getToken({ template: 'integrations' });
    const res = await api.delete(`/business/deleteEventImage/${eventUuid}`, {
      data: { fileName },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // { message: 'Deleted' }
  }

  async function countEvents(username: string) {
  const res = await api.get(`/business/countEvents/${username}`);
  return res.data
}

  return {
    getBusinessInfo,

    upsertEvent,
    deleteEvent,
    getEvents,

    uploadBusinessImage,
    getBusinessImages,
    deleteBusinessImage,

    uploadEventImage,
    getEventImages,
    deleteEventImage,

    countEvents
  };
}
