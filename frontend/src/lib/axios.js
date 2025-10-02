import axios from "axios";

const baseURL = '/api';


const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export default axiosInstance;