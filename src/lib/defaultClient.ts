import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true;

const Axios: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
    withCredentials: true,
    headers: {
        'access-token': localStorage.getItem('tk')
    }
})

const AxiosForTest: AxiosInstance = axios.create({
    baseURL: 'https://api.xircle.org',
    withCredentials: true
})

export default Axios;