import axios from "axios";

// in production, there is no localhost so we have to make this dynamic, so we write the const BASE_URL
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

export default axiosInstance