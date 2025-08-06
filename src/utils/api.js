import axios from 'axios';

const api = axios.create({
    baseURL:'https://beach-backend-testing.onrender.com',
});

export default api;
