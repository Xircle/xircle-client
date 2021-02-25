import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://ykring.herokuapp.com'
})

export default Axios;
