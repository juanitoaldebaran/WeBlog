import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

const api: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        console.log("Config request received from", config.baseURL);
        return config;
    },

    (error) => {
        if (error) {
            console.error(error.response?.data?.message || "Error in sending request");
            return Promise.reject(error);
        }
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        const status = error.response?.status;

        switch (status){
            case 401:
                console.error("Unauthorized Access!");
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("user");
                window.location.href = '/auth/login';
                break;
            case 403:
                console.error("Forbidden - Insufficient Permission");
                break;

            case 404:
                console.error("Not found - Endpoint doesn't exist");
                break;

             case 422:
                console.error("Validation Error:");
                break;
                    
            case 429:
                console.error("Rate Limited - Too many requests");
                break;
                    
            case 500:
                console.error("Server Error - Something went wrong on the server");
                break;
                    
            default:
                console.error(`HTTP Status Error: ${status}`);
        }

        return Promise.reject(error);
    }

)

export default api;