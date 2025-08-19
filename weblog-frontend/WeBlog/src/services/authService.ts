import type { LoginRequest, LoginResponse, RegisterRequest, User, Blog, Comment } from "../types/auth";
import api from "../config/api";

async function login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await api.post('/auth/login', credentials);

        console.log("Sending POST method for login");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to send login request");
    }
}

async function register(credentials: RegisterRequest): Promise<User> {
    try {
        const response = await api.post('/auth/signup', credentials);

        console.log("Sending POST method for sign up");
        return response.data;
    } catch (error: any) {
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

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const response = await api.get("/blog");
        
        return response.data.map((blog: Blog) => ({
        ...blog,
        createdAt: new Date(blog.createdAt).toISOString()
        }));
    } catch (error: any) {
        console.error("getBlog error:", error);
        throw new Error(error.response?.data?.message || "Failed to load blog endpoints");
    }
}

async function getComments(blogId?: number): Promise<Comment[]> {
    try {
        const response = await api.get("/comment", { params: { blogId }});
        return response.data as Comment []; 
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to load comments");
    }
}

async function createComments(commentData: {blogId: number; content: string}): Promise<Comment> {
    try {
        const response = await api.post("/comment", commentData);
        return response.data as Comment;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create comment");
    }
}

async function createBlog(blog: Blog): Promise<Blog> {
    try {
        const response = await api.post("/blog", blog);
        return response.data as Blog;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create blog");
    }
}

export default {
    login,
    register,
    logout,
    getJwtToken,
    isAuthenticated,
    getAllBlogs,
    getComments,
    createComments,
    createBlog
}