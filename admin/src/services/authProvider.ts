import { AuthProvider } from 'react-admin';
import axios from 'axios';
import {API_URL} from "../http";

export const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        return axios.post(`${API_URL}/login`, {
            email: username,
            password
        }, {
            withCredentials: true
        })
            .then(response => {
                localStorage.setItem('token', response.data.accessToken);
            })
            .catch(error => {
                throw new Error(error.response ? error.response.statusText : 'Network error');
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        console.log('checkError')
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: async () => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
        } catch (error) {
            console.log('Error in checkAuth:', error);
            return Promise.reject();
        }
    },
    getPermissions: () => Promise.resolve(),
};
