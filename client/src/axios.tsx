import Axios from 'axios';

export const axios = Axios.create({
    withCredentials: true,
    baseURL: 'https://localhost:8080',
});