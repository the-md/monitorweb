import { type AuthProvider } from 'react-admin'
import axios from 'axios'

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        await axios.post(`${import.meta.env.APP_API_URL}/login`, {
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
            await Promise.reject(new Error('Network error 401 or 403'))
            return
        }
        await Promise.resolve()
    },
    checkAuth: async () => {
        try {
            const response = await axios.get(`${import.meta.env.APP_API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)

            localStorage.getItem('token') !== null ? await Promise.resolve() : await Promise.reject(new Error('Error in checkAuth #1'))
        } catch (error) {
            console.log('Error in checkAuth:', error)
            await Promise.reject(new Error('Error in checkAuth #2'))
        }
    },
    getPermissions: async () => {
        await Promise.resolve()
    }
}
