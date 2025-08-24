import { useEffect, useState } from "react";
import type { Blog } from "../../types/blog";
import blogService from "../../services/blogService";
import useNotification from "../../hooks/useNotification";
import Notification from "../common/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faX } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

interface BlogListProps {
    refreshTrigger: number;
}


const BlogList: React.FC<BlogListProps> = ({refreshTrigger}) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const {notification, showNotification, hideNotification} = useNotification();
    const {user} = useAuth();

    const loadBlogs = async () => {
        try {
            const allBlogs = await blogService.getAllBlogs();
            showNotification("Please see all your current blogs", "success");
            setBlogs(allBlogs);
        } catch (error: any) {
            showNotification("Failed to get all your current blogs", "error");
            throw new Error(error?.response?.data?.message || "Failed to get all blogs");
        }   
    }

    const handleUpdate =  async (blogId: number) => {
        
    }

    const handleDelete = async (blogId: number) => {
        
    }

    useEffect(() => {
        loadBlogs();
    }, [refreshTrigger]);

    return (
        <div className="min-h-screen py-12 mt-10">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faBox} size="2x" className="text-blue-500"/>
                    <h1 className="text-3xl">All Blogs</h1>
                </div>

                <table className="min-w-full shadow-md border-none rounded">
                    <thead>
                        <tr className="bg-blue-500 text-center text-white">
                            <th className="px-4 py-2 font-light">Creator</th>
                            <th className="px-4 py-2 font-light">Title</th>
                            <th className="px-4 py-2 font-light">Category</th>
                            <th className="px-4 py-2 font-light">Created</th>
                            <th className="px-4 py-2 font-light">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                           <tr>
                                <td colSpan={5} className="text-center py-4">
                                    You have no blogs
                                </td>
                            </tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50 text-center">
                                    <td className="px-4 py-2">{user?.email}</td>
                                    <td className="px-4 py-2">{blog.title}</td>
                                    <td className="px-4 py-2">{blog.category}</td>
                                    <td className="px-4 py-2">{blog.createdAt}</td>
                                    <td className="px-4 py-2 flex items-center justify-center gap-4">
                                        <button onClick={() => handleUpdate(blog.id)} className="rounded text-sm border p-1 cursor-pointer">
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(blog.id)} className="rounded-full text-sm bg-red-100 text-red-500 p-1 cursor-pointer">
                                            <FontAwesomeIcon icon={faX}/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                duration={400}
                position={"top-center"}
            />
        </div>
    )
}

export default BlogList;