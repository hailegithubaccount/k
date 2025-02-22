import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/user", // Adjust based on your backend
});

// Attach token to every request if user is logged in
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
