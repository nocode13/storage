import axios from 'axios';
import { API_URL } from '../config/api';
import { authStorageService } from '../lib/auth-storage';

export const baseInstance = axios.create({
  baseURL: API_URL,
});

baseInstance.interceptors.request.use(
  async (config) => {
    const token = authStorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
