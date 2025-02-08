import axios from 'axios';
import i18n from '../i18n/i18n';

// Axios instance létrehozása
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', // Az alap URL, amit az API hívásokhoz használsz
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor hozzáadása az összes kéréshez
apiClient.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = i18n.language;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;