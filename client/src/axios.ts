import axios from "axios";

export const request = axios.create({
    baseURL: 'http://localhost:8000',
})

request.interceptors.request.use((config) => {
    config.headers.Authorization = "Token " + localStorage.getItem("token")
    return config
})