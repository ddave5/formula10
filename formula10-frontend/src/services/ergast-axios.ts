import axios from "axios";
import eventBus from "./eventBus";

const ergastClient = axios.create({
    baseURL: 'http://ergast.com/api/f1/', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Hibakezelés interceptor
ergastClient.interceptors.response.use(
(response) => response,
(error) => {

    //TODO HANDLE 
    if (error.response && error.response.status > 400) {
    const message = error.response.data || 'Error :('
    eventBus.emit('error', message); 
    }

    return Promise.reject(error); 
}
);

export default ergastClient;