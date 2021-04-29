import axios, { AxiosInstance } from 'axios';

export const Axios: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
})

export const AxiosForTest: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
})

