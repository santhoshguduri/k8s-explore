import axios from 'axios';
import LocalStorageService from './LocalStorage';

const API_ENDPOINT = 'http://localhost:8000';
axios.defaults.baseURL = API_ENDPOINT;

axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = LocalStorageService.getItemValue('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axios;