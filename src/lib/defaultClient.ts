import axios, { AxiosInstance } from 'axios';

const token = localStorage.getItem('tk');

const Axios: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
    timeout: 5000,
    headers: {
        'access-token': token
    }
})

const AxiosForTest: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
    withCredentials: true
})

export default Axios;