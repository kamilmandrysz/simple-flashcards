import axios from 'axios';
import { ApiResponseError } from './types';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleAxiosErrors = (err: unknown): ApiResponseError => {
  if (!axios.isAxiosError(err) || !err.response?.data) {
    throw err;
  }

  return err.response.data;
};

export default API;
