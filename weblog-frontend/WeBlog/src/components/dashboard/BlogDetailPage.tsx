import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Blog } from "../../types/blog";
import type { Comment } from "../../types/comment";
import blogService from "../../services/blogService";
import commentService from "../../services/commentService";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import Notification from "../common/Notification";
import LoadingSpinner from "../common/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCalendar, 
    faUser, 
    faTag, 
    faArrowLeft,
    faComment,
    faPaperPlane 
} from "@fortawesome/free-solid-svg-icons";

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { notification, showNotification, hideNotification } = useNotification();
    
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const fetchBlogAndComments = async () => {
        if (!id) return;
        
        try {
            setIsLoading(true);
            const [blogData, commentsData] = await Promise.all([
                blogService.getBlogById(Number(id)),
                commentService.getCommentsByBlog(Number(id))
            ]);
            
            setBlog(blogData);
            setComments(commentsData);
        } catch (error: any) {
            showNotification("Failed to load blog details", "error");
            console.error("Error fetching blog details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogAndComments();
    }, [id]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            showNotification("Please login to add comments", "warning");
            return;
        }
        
        if (!newComment.trim()) {
            showNotification("Please enter a comment", "warning");
            return;
        }

        try {
            setIsSubmittingComment(true);
            await commentService.addComment(Number(id), newComment.trim());
            setNewComment("");
            showNotification("Comment added successfully", "success");
            
            // Refresh comments
            const updatedComments = await commentService.getCommentsByBlog(Number(id));
            setComments(updatedComments);
        } catch (error: any) {
            showNotification("Failed to add comment", "error");
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
                    <Link 
                        to="/blog" 
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Back to blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Back
                        </button>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm opacity-90">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{user?.firstName} {user?.lastName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faCalendar} />
                                <span>{formatDate(blog.createdAt || '')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faTag} />
                                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Blog Image */}
                {blog.imageUrl && (
                    <div className="mb-8">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/api/placeholder/800/400';
                            }}
                        />
                    </div>
                )}

                {/* Blog Description */}
                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {blog.description}
                        </p>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="mb-12">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Content</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {blog.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <FontAwesomeIcon icon={faComment} className="text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Comments ({comments.length})
                        </h2>
                    </div>

                    {/* Add Comment Form */}
                    {user ? (
                        <form onSubmit={handleAddComment} className="mb-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                        rows={3}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmittingComment || !newComment.trim()}
                                        className="mt-3 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmittingComment ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                                Post Comment
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-4">Please login to add comments</p>
                            <Link 
                                to="/auth/login" 
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                Login here
                            </Link>
                        </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No comments yet. Be the first to comment!
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-gray-800">
                                                    {comment?.authorName} 
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(comment.createdAt || '')}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                position="top-center"
                duration={4000}
            />
        </div>
    );
};

export default BlogDetailPage;