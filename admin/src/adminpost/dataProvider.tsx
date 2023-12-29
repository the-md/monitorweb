import {API_URL} from "./http";
import axios from 'axios';

import { DataProvider } from 'react-admin';

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        console.log('getList');
        const url = `${API_URL}/getSites`;
        try {
            const response = await axios.get(url);
            // Проверьте, что response.data существует и является массивом
            if (Array.isArray(response.data)) {
                console.log("response.data",response.data)
                return {
                    data: response.data,
                    total: response.data.length, // Укажите общее количество записей
                };
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    create: async (resource, params) => {
        console.log('create');
        const url = `${API_URL}/createSite`;
        try {
            const response = await axios.post(url, params.data);
            // Проверьте, что response.data существует
            if (response.data) {
                return { data: response.data };
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getOne: async (resource, params) => {
        console.log('getOne');
        const response = await axios.get(`${API_URL}/${resource}/${params.id}`);
        return { data: response.data };
    },
    getMany: async (resource, params) => {
        console.log('getMany');
        const query = params.ids.map(id => `id=${id}`).join('&');
        const response = await axios.get(`${API_URL}/${resource}?${query}`);
        return { data: response.data };
    },
    getManyReference: async (resource, params) => {
        console.log('getManyReference');
        const response = await axios.get(`${API_URL}/${resource}`);
        return { data: response.data, total: response.data.length };
    },
    update: async (resource, params) => {
        console.log('update');
        const response = await axios.put(`${API_URL}/${resource}/${params.id}`, params.data);
        return { data: response.data };
    },
    updateMany: async (resource, params) => {
        console.log('updateMany');
        const promises = params.ids.map(id =>
            axios.put(`${API_URL}/${resource}/${id}`, params.data)
        );
        await Promise.all(promises);
        return { data: params.ids };
    },
    delete: async (resource, params) => {
        console.log('delete');
        const response = await axios.delete(`${API_URL}/${resource}/${params.id}`);
        return { data: response.data }; // предполагая, что response.data содержит полную запись
    },
    deleteMany: async (resource, params) => {
        console.log('deleteMany');
        const promises = params.ids.map(id => axios.delete(`${API_URL}/${resource}/${id}`));
        await Promise.all(promises);
        return { data: params.ids };
    },

};

export default dataProvider;
