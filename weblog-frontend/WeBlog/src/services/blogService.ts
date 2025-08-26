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

async function getBlogsByAuthor(authorId: number): Promise<Blog[]> {
    try {
        const response = await api.get(`/blog/author/${authorId}`);
        console.log("Request sent to get blogs by author", response.data);
        return response.data as Blog[];
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to get blog by id");
    }
}

async function updateBlog(blogId: number, blog: CreateBlogRequest): Promise<Blog> {
    try {
        const response = await api.put(`/blog/${blogId}`, blog);
        console.log("Request sent to update blog by id", response.data);
        return response.data as Blog;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to update blog by id");
    }
}
async function getBlogsByCategory(category: string): Promise<Blog[]> {
    try {
        const response = await api.get(`/blog/category/${category}`);
        console.log("Request sent to get blog by category", response.data);
        return response.data as Blog[];
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to get blog by id");
    }
}

async function searchBlog(keyword: string): Promise<Blog[]> {
    try {
        const response = await api.get(`/blog/search`, { params: {keyword} });
        console.log("Request sent to search blog by keyword", response.data);
        return response.data as Blog[];
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to search blog");
    }
}

async function getMyBlogs(): Promise<Blog[]> {
    try {
        const response = await api.get(`/blog/my-blogs`);
        console.log("Request sent to get my blogs", response.data);
        return response.data as Blog[];
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Failed to fetch all blogs");
    }
}


async function deleteBlog(blogId: number): Promise<void>{
    try {
        const response = await api.delete(`/blog/${blogId}`);
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
    updateBlog,
    searchBlog,
    getBlogsByCategory,
    getBlogsByAuthor,
    getMyBlogs,
}