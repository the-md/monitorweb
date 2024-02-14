import { type AuthProvider } from 'react-admin'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.APP_API_URL

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        await axios.post('/login', {
            email: username,
            password
        }, {
            withCredentials: true
        })
            .then(response => {
                localStorage.setItem('token', response.data.accessToken)
                localStorage.setItem('userId', response.data.user.id)
            })
            .catch(error => {
                throw new Error(error.response !== null && error.response !== undefined ? error.response.statusText : 'Network error')
            })
    },
    logout: async () => {
        localStorage.removeItem('token')
        await Promise.resolve()
    },
    checkError: async ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token')
            await Promise.reject(new Error(`Network error ${status}`))
            return
        }
        await Promise.resolve()
    },
    checkAuth: async () => {
        const token = localStorage.getItem('token')
        if (token != null) {
            await Promise.resolve()
        } else {
            await Promise.reject(new Error('User not authenticated'))
        }
    },
    getPermissions: async () => {
        await Promise.resolve()
    }
}
