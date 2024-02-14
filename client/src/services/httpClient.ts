import { fetchUtils } from 'react-admin'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import axios from 'axios'

async function refreshAuthToken () {
    try {
        const response = await axios.get('/refresh', { withCredentials: true })
        const { accessToken } = response.data
        localStorage.setItem('token', accessToken)
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

export const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    const customHeaders = ((options.headers != null) ||
        new Headers({
            Accept: 'application/json'
        })) as Headers

    let token = localStorage.getItem('token')
    if (token != null && isTokenExpired(token)) {
        token = await refreshAuthToken()
    }
    if (token != null) {
        customHeaders.set('Authorization', `Bearer ${token}`)
    } else {
        throw new Error('Token is null')
    }
    options.headers = customHeaders
    return await fetchUtils.fetchJson(url, options)
}
