import { useNavigate } from "react-router";
import type { Blog, User } from "../../types/auth";
import {  Calendar, Eye, MessageSquare } from "lucide-react";


interface BlogProps {
    user: User;
    blog: Blog;
    showAuthor?: boolean;
    showActions?: boolean;
    onEdit?: (blog: Blog) => void;
    onDelete?: (blogId: number) => void;
}

const BlogCard: React.FC<BlogProps> = ({user, blog, showAuthor = true, showActions = false, onEdit, onDelete}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/blog/${blog.id}`);
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.(blog);
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this blog")){
            onDelete?.(blog.id);
        }
    }

    return (
        <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1g">
            <div onClick={handleCardClick}>
            
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={blog.imageUrl || "/api/placeholder/400/200"} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                            {blog.category}
                        </span>
                    </div>
                </div>
                
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {blog.content || blog.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                            {showAuthor && (
                                <div className="flex items-center space-x-1">
                                    <span>{user.firstName} {user.lastName}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{blog.views || 0}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <MessageSquare size={14} />
                                <span>{blog.commentCount || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {showActions && (
                <div className="px-6 pb-4 flex space-x-2">
                    <button
                        onClick={handleEdit}
                        className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}

        </div>
    )
}

export default BlogCard;
