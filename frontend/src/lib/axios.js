import axios from "axios";

const baseURL = 
import.meta.env.MODE === "development"
    ? "/api" 
    : "https://mangastore-yui.us-east-2.elasticbeanstalk.com/api";;


const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export default axiosInstance;