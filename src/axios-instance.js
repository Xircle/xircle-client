import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://back.xircle.org',
})

export const AxiosForTest = axios.create({
    baseURL: 'https://back.xircle.org',
})
