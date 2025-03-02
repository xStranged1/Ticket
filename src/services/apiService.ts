import Cookies from 'js-cookie';

import axios from 'axios';
import { API_URL } from '../const/config';

export const axiosClient = axios.create({
    baseURL: API_URL,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // manejar errores globales, 401 por ej
        if (error.response && error.response.status === 401) {
            // logOut, refreshi token por ej
        }
        return Promise.reject(error);
    }
);
