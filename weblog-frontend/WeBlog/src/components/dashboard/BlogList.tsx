import { useEffect, useState } from "react";
import type { Blog } from "../../types/blog";
import blogService from "../../services/blogService";
import useNotification from "../../hooks/useNotification";
import Notification from "../common/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faX } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import Modal from "../common/Modal";

interface BlogListProps {
    refreshTrigger: number;
}

const BlogList: React.FC<BlogListProps> = ({refreshTrigger}) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const {notification, showNotification, hideNotification} = useNotification();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog>({
        title: "",
        category: "TECHNOLOGY",
        content: "",
        description: "",
        imageUrl: "",
    } as Blog);
    const {user} = useAuth();

    const categories = [
        "TECHNOLOGY",
        "FINANCE",
        "HEALTH",
        "TRAVEL",
        "SPORT"
    ]

    const loadBlogs = async () => {
        try {
            const allBlogs = await blogService.getMyBlogs();
            showNotification("Please see all your current blogs", "success");
            setBlogs(allBlogs);
        } catch (error: any) {
            showNotification("Failed to get all your current blogs", "error");
            throw new Error(error?.response?.data?.message || "Failed to get all blogs");
        }   
    }

    const openUpdateModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setShowUpdateModal(true);
    }

    const handleUpdate = async () => {
        if (!selectedBlog) return null;

        try {
            const updatedBlog = await blogService.updateBlog(selectedBlog.id, {
                title: selectedBlog?.title,
                content: selectedBlog?.content,
                category: selectedBlog?.category,
                imageUrl: selectedBlog?.imageUrl,
                description: selectedBlog?.description,
            });
            setBlogs((prev) => prev.map((newBlog) => (newBlog.id === updatedBlog.id ? updatedBlog : newBlog)));
            showNotification("New blog updated successfully", "success");
            setShowUpdateModal(false);
        } catch (error: any) {
            showNotification(error?.response?.data?.message || "Failed to update current blog", "error");
        }
    }

    const handleDelete = async (blogId: number) => {
        try {
           if (window.confirm(("Do you want to delete this blog?"))) {
                await blogService.deleteBlog(blogId);
                setBlogs((prev) => prev.filter((blog) => blog.id != blogId));
                showNotification("Blog deleted successfully", "success");
            }  
        } catch (error: any) {
            showNotification(error?.response?.data?.message ||"Failed to delete blog","error");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSelectedBlog((prev) => ({
            ...prev,
            [name]: value
        }))
    };

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
                                        <button onClick={() => openUpdateModal(blog)} className="rounded text-sm border p-1 cursor-pointer">
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

                {showUpdateModal && selectedBlog && (
                        <Modal
                         isOpen={showUpdateModal} 
                         onClose={() => setShowUpdateModal(false)} 
                         onSubmit={handleUpdate} 
                         title="Update Blog"
                         >
                            <div className="p-4 flex flex-col gap-4">
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={selectedBlog.imageUrl}
                                        placeholder="Enter image url"
                                        className="w-full bg-gray-100 shadow rounded p-2"
                                        onChange={handleChange}
                                    />

                                    <input 
                                        id="title"
                                        name="title"
                                        value={selectedBlog.title}
                                        placeholder="Enter title"
                                        className="w-full bg-gray-100 shadow rounded p-2"
                                        onChange={handleChange}
                                    />

                                    <input 
                                        id="content"
                                        name="content"
                                        value={selectedBlog.content}
                                        placeholder="Enter content"
                                        className="w-full bg-gray-100 shadow rounded p-2"
                                        onChange={handleChange}
                                    />

                                    <select 
                                        id="category"
                                        name="category"
                                        value={selectedBlog.category}
                                        className="w-full bg-gray-100 shadow rounded p-2"
                                        onChange={handleChange}
                                    >   
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>

                                    <textarea 
                                        id="description"
                                        name="description"
                                        value={selectedBlog.description}
                                        placeholder="Enter title"
                                        className="w-full bg-gray-100 shadow rounded p-2"
                                        onChange={handleChange}
                                    />
                            </div>
                        </Modal>
                )}
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