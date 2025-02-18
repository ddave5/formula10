import axios from 'axios';
import i18n from '../i18n/i18n';
import { getToken } from './tokenService';
import eventBus from './eventBus';

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
    
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = i18n.language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hibakezelés interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    //TODO HANDLE 
    if (error.response && error.response.status === 500) {
      const message = error.response.data || 'Error :('
      eventBus.emit('error', message); // 500-as hibák globális megjelenítése
    }

    return Promise.reject(error); // Hibát továbbra is feldobjuk
  }
);

export default apiClient;