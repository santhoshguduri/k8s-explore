import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT

axios.defaults.baseURL = API_ENDPOINT;
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("keyCloak")).token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axios;