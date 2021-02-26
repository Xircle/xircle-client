import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://ykring.herokuapp.com',
    withCredentials: false,
})

export const AxiosForCORS = axios.create({
    baseURL: 'https://ykring.herokuapp.com',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }  
})

