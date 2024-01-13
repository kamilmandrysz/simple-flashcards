import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
