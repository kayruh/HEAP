import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

export async function updateUser(firstName, lastName, dobISO) {
  await axiosClient.post('/updateUser', {
    first_name: firstName,
    last_name:  lastName,
    DOB:        dobISO,
  });
}