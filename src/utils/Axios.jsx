import axios from 'axios';
import auth from './Auth';
import { refreshToken } from '../services/OAuth';

const API_ENDPOINT = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = auth.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshToken();
        const newAccessToken = data.access_token;

        auth.setToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;