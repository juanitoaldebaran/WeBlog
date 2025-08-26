import { useState } from "react";
import type { Blog } from "../../types/blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBook, faFileText, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import useNotification from "../../hooks/useNotification";
import blogService from "../../services/blogService";
import Notification from "../common/Notification";

interface AddBlogProps {
    onBlogCreated: () => void;
}

const dispatchBlogCreatedEvent = () => {
    window.dispatchEvent(new Event('blogCreated'));
};

const AddBlog: React.FC<AddBlogProps> = ({onBlogCreated}) => {
    const initialBlogData = {
        imageUrl: "",
        title: "",
        content: "",
        category: "TECHNOLOGY",
        description: "",
    };

    const [blogData, setBlogData] = useState<Blog>(initialBlogData as Blog);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isBlogValid = blogData.imageUrl && blogData.title && blogData.content && blogData.category && blogData.description;
    const {notification, showNotification, hideNotification} = useNotification();

    const {isLoading} = useAuthContext();

    const categories = [
        "TECHNOLOGY",
        "HEALTH",
        "FINANCE",
        "SPORT",
        "TRAVEL"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setBlogData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const createBlog = async () => {
       try {
            setIsSubmitting(true);
            const newBlog = await blogService.createBlog(blogData);
            console.log("Blog created successfully", newBlog);
            showNotification("Blog successfully created! It will appear in the blog list shortly.", "success");
            
            // Reset form
            setBlogData(initialBlogData as Blog);
            
            // Dispatch custom event for immediate UI updates
            dispatchBlogCreatedEvent();
            
            // Also use localStorage as fallback
            localStorage.setItem('blogCreated', Date.now().toString());
            
            // Call the callback
            onBlogCreated();
            
        } catch (error: any) {
            showNotification(error?.response?.data?.message || "Failed to create blog", "error");
            console.error("Error creating blog:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isBlogValid) {
            showNotification("Please fill up all form fields", "error");
            return;
        }
        
        await createBlog();
    }

    return (
        <div className="bg-white min-h-screen py-12 mt-10 flex justify-center items-start">
            <div className="p-10 w-full max-w-2xl">
                <div className="flex items-center justify-start gap-2">
                    <FontAwesomeIcon icon={faAdd} className="text-blue-500" size={"2x"}/>
                    <h1 className="text-bold text-2xl">Create a new blog</h1>
                </div>

                <form className="space-y-8 mt-10" onSubmit={handleSubmit}>
                    
                    <label className="block text-[18px] font-medium text-gray-700 mb-2">
                            Upload Image
                    </label>
                    <div className="flex items-center gap-3 shadow rounded-lg p-2 bg-gray-50">
                        <FontAwesomeIcon icon={faUpload}/>
                        <input
                            value={blogData.imageUrl || ""}
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="Enter image url"
                            className="w-full bg-transparent outline-none"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <label className="block text-[18px] font-medium text-gray-700 mb-2">
                            Blog Title
                    </label>
                    <div className="flex items-center gap-3 shadow rounded-lg p-2 bg-gray-50">
                        <FontAwesomeIcon icon={faBook}/>
                        <input
                            value={blogData.title || ""} 
                            id="title"
                            name="title"
                            placeholder="Enter blog title"
                            className="w-full bg-transparent outline-none"
                            onChange={handleChange}
                        />
                    </div>

                    <label className="block text-[18px] font-medium text-gray-700 mb-2">
                            Blog Content
                    </label>
                    <div className="flex items-start gap-3 shadow rounded-lg p-2 bg-gray-50">
                        <FontAwesomeIcon icon={faFileText} className="mt-2"/>
                        <textarea
                            value={blogData.content || ""} 
                            id="content"
                            name="content"
                            placeholder="Enter blog content"
                            rows={8}
                            className="w-full bg-transparent outline-none resize-none"
                            onChange={handleChange}
                        />
                    </div>
                        
                    <label className="block text-[18px] font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <div>
                        <select
                            name="category"
                            value={blogData.category || "TECHNOLOGY"} 
                            onChange={handleChange}
                            className="w-full rounded shadow bg-gray-50 border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="block text-[18px] font-medium text-gray-700 mb-2">
                    Short Description
                    </label>
                    <div>
                        <textarea
                        value={blogData.description || ""}
                        id="description"
                        name="description"
                        placeholder="Enter a short description..."
                        className="w-full shadow rounded-lg bg-gray-50 border border-gray-300 p-3 h-20 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={!isBlogValid || isSubmitting}
                        className="bg-blue-500 rounded text-white p-4 cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
                    >
                        {isSubmitting || isLoading ? <LoadingSpinner /> : "Create Blog"}
                    </button>
                </form>
            </div>
            
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                duration={4000}
                position={"top-center"}
            />
        </div>
    )
}

export default AddBlog;