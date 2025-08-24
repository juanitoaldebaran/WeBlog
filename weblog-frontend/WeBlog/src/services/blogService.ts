import type { Blog, CreateBlogRequest } from "../types/blog";
import api from "../config/api";

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const response = await api.get("/blog");
        console.log("Request sent to get all blogs", response.data);
        return response.data as Blog[];
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to get all blogs");
    }
}

async function createBlog(blog: CreateBlogRequest): Promise<Blog> {
    try {
        const response = await api.post("/blog", blog);
        console.log("Request sent to create all blogs", response.data);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to create a blog");
    }
}

async function getBlogById(blogId: number): Promise<Blog> {
    try {
        const response = await api.get(`/blog/${blogId}`);
        console.log("Request sent to get blog by id", response.data);
        return response.data as Blog;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to get blog by id");
    }
}

async function deleteBlog(blogId: number): Promise<void>{
    try {
        const response = await api.delete(`/${blogId}`);
        console.log("Request sent to delete blog", response.data);
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to delete blog");
    }
}

export default {
    getAllBlogs,
    createBlog,
    getBlogById,
    deleteBlog,
}