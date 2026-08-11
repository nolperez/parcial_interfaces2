import axios from 'axios';

const rawUrl = process.env.REACT_APP_API_URL || 'https://interfaces.nolbertoperez.eu/api';
const API_URL = String(rawUrl).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute = String(error.config?.url || '').includes('/login')
        || String(error.config?.url || '').includes('/register');
      if (!isAuthRoute) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_URL };
