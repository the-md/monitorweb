import axios from 'axios'
import { type FormValues } from '../types'

axios.defaults.baseURL = import.meta.env.APP_API_URL

export const registration = async (auth: FormValues) => {
    try {
        const response = await axios.post('/registration', auth, { withCredentials: true })
        if (response.status !== 200) {
            throw new Error('Network error')
        }

        return response.data
    } catch (error) {
        throw new Error('Failed')
    }
}
