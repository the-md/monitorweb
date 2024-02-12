import { fetchUtils } from 'react-admin'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { CustomFetchOptions } from '../types'
import axios from 'axios'

async function refreshAuthToken () {
    try {
        const response = await axios.get('/refresh', { withCredentials: true })
        const { accessToken } = response.data
        localStorage.setItem('authToken', accessToken)
        return accessToken
    } catch (error) {
        throw new Error('Failed to update authentication token')
    }
}

function isTokenExpired (token: string): boolean {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000
    return (decodedToken.exp ?? 0) < currentTime
}

export const httpClient = async (url: string, options: CustomFetchOptions = {}) => {
    if (options.headers == null) {
        options.headers = new Headers({ Accept: 'application/json' })
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers)
    }
    let token = localStorage.getItem('token')
    if (token != null && isTokenExpired(token)) {
        token = await refreshAuthToken()
    }

    if (token != null) {
        options.headers.set('Authorization', `Bearer ${token}`)
    } else {
        throw new Error('Token is null')
    }

    try {
        const response: { status: number, headers: Headers, body: string, json: any } = await fetchUtils.fetchJson(url, options)
        return response
    } catch (error) {
        return await Promise.reject(error)
    }
}
