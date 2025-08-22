import type { LoginRequest, LoginResponse, RegisterRequest, User } from "../types/auth";
import api from "../config/api";

async function login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await api.post('/auth/login', credentials);

        console.log("Sending POST method for login");
        return response.data;
    } catch (error: any) {
        console.error("Login API Error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to send login request");
    }
}

async function register(credentials: RegisterRequest): Promise<User> {
    try {
        const response = await api.post('/auth/signup', credentials);

        console.log("Sending POST method for sign up", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Register API Error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to send register request");
    }
} 

function logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    window.location.href = '/auth/login';
}

function getJwtToken(): string | null {
    return localStorage.getItem("jwtToken");
}

function isAuthenticated(): boolean {
    const jwtToken = getJwtToken();

    return jwtToken != null;
}

function getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
}

export default {
    login,
    register,
    logout,
    getJwtToken,
    isAuthenticated,
    getUser,
}