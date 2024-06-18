import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL
});

instance.interceptors.request.use(config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default instance;