import axios from 'axios';
import { useAuth }from "@clerk/clerk-expo";


export const api = axios.create({
  baseURL: 'http://172.20.10.2:3000',
  headers: { 'Content-Type': 'application/json' },
});

//(if you want RLS or auth on the backend)

// api.interceptors.request.use(async (cfg) => {
//   const token = await useAuth().getToken({ template: "supabase" });    // short-lived JWT
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;  // ← header
//   return cfg;
// });


