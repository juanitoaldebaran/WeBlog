import type { Comment } from "../types/comment";
import api from "../config/api";

async function getCommentsByBlog(blogId: number): Promise<Comment[]> {
  try {
    const response = await api.get(`/comment/blog/${blogId}`);
    return response.data as Comment[];
  } catch (error: any) {
    throw new Error("Failed to fetch comments for the blog");
  }
}

async function getMyComments(): Promise<Comment[]> {
  try {
    const response = await api.get(`/comment/my-comments`);
    return response.data as Comment[];
  } catch (error: any) {
    throw new Error("Failed to fetch your comments");
  }
}

async function addComment(blogId: number, content: string): Promise<Comment> {
  try {
    const response = await api.post(`/comment/blog/${blogId}`, { content });
    return response.data as Comment;
  } catch (error: any) {
    throw new Error("Failed to add comment");
  }
}

export default {
  getCommentsByBlog,
  getMyComments,
  addComment,
};
