import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

//(if you want RLS or auth on the backend)

// api.interceptors.request.use(async (config) => { 
//   const { getToken } = await import('@clerk/clerk-expo');
//   const token = await getToken({ template: 'supabase' }).catch(() => undefined);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });