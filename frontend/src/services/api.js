import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor - zid token f kol request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor - chouf l'erreur
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API ERROR:', error.message);
        if (error.response) {
            console.log('STATUS:', error.response.status);
            console.log('DATA:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default api;