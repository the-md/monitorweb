import type { CustomFetchOptions } from '../types'
import { fetchUtils } from 'react-admin'

export const httpClient = async (url: string, options: CustomFetchOptions = {}) => {
    if (options.headers == null) {
        options.headers = new Headers({ Accept: 'application/json' })
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers)
    }
    const token = localStorage.getItem('token')
    if (token != null) {
        options.headers.set('Authorization', `Bearer ${token}`)
    }
    return await fetchUtils.fetchJson(url, options)
}
