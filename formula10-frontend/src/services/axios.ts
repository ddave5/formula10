import axios from 'axios';
import i18n from '../i18n/i18n';
import { getToken } from './token.service';
import eventBus from './eventBus';

// Axios instance létrehozása
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', 
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
    if (error.response && error.response.status >= 400) {
      const message: string = error.response.data?.message || 'Error :(';
      const isDialog: boolean = error.response.data?.dialog ?? false;

      eventBus.emit('error', { message, isDialog });
    }
    return Promise.reject(error);
  }
);

export default apiClient;