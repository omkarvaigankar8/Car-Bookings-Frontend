import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URl || 'http://localhost:8888/apis',
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;