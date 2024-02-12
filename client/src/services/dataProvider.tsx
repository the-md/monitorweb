import axios from 'axios'
import { type DataProvider } from 'react-admin'

axios.defaults.baseURL = import.meta.env.APP_API_URL

const dataProvider: DataProvider = {
    getList: async () => {
        const url = '/getSites'
        const response = await axios.get(url)
        if (Array.isArray(response.data)) {
            console.log('response.data', response.data)
            return {
                data: response.data,
                total: response.data.length
            }
        } else {
            throw new Error('Invalid data format')
        }
    },
    create: async (resource, params) => {
        const url = '/createSite'
        const response = await axios.post(url, params.data)
        if (response.data != null) {
            return { data: response.data }
        } else {
            throw new Error('Invalid data format')
        }
    },
    getOne: async (resource, params) => {
        const response = await axios.get(`/${resource}/${params.id}`)
        return { data: response.data }
    },
    getMany: async (resource, params) => {
        const query = params.ids.map(id => `id=${id}`).join('&')
        const response = await axios.get(`/${resource}?${query}`)
        return { data: response.data }
    },
    getManyReference: async (resource) => {
        const response = await axios.get(`/${resource}`)
        return { data: response.data, total: response.data.length }
    },
    update: async (resource: string, params: { id: number, data: any }) => {
        const response = await axios.put(`/${resource}/${params.id}`, params.data)
        return { data: response.data }
    },
    updateMany: async (resource, params) => {
        const promises = params.ids.map(async id =>
            await axios.put(`/${resource}/${id}`, params.data)
        )
        await Promise.all(promises)
        return { data: params.ids }
    },
    delete: async (resource, params) => {
        const response = await axios.delete(`/${resource}/${params.id}`)
        return { data: response.data } // предполагая, что response.data содержит полную запись
    },
    deleteMany: async (resource, params) => {
        const promises = params.ids.map(async id => await axios.delete(`/${resource}/${id}`))
        await Promise.all(promises)
        return { data: params.ids }
    }

}

export default dataProvider
