import axios from 'axios';
import { useAuth }from "@clerk/clerk-expo";


export const api = axios.create({
  // baseURL: 'https://fyndbackend.vercel.app',
  baseURL: 'http://localhost:4000', //use this if you wanna use web browser or phone simulator
  // baseURL: 'http://172.20.10.2:3000', // use this if you want to hotspot to ur phone to view on expo go
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

//(if you want RLS or auth on the backend)

// api.interceptors.request.use(async (cfg) => {
//   const token = await useAuth().getToken({ template: "supabase" });    // short-lived JWT
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;  // ← header
//   return cfg;
// });


