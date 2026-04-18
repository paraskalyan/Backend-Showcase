import axios from 'axios';

const BASE_URL = "http://localhost:4000/api"

const apiClient = axios.create(
    {
        baseURL: BASE_URL,
        timeout: 5000,
        withCredentials: true,
    }
)

export default apiClient;   