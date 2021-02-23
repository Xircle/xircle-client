import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://burger-builder-6b6a7.firebaseio.com/'
})

export default Axios;
