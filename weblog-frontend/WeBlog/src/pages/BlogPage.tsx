import { useEffect, useState } from "react";
import authService from "../services/authService";
import type { Blog, Comment } from "../types/auth";
import { useAuthContext } from "../context/AuthContext";

const BlogPage: React.FC = () => {
  const {user} = useAuthContext();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await authService.getAllBlogs();
        setBlogs(blogData);

        const commentData = await authService.getComments();
        setComments(commentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Please log in to view blogs and comments</h2>
      </div>
    );
  }

  const myBlogs = blogs.filter(blog => blog.id === user.id);
  const myComments = comments.filter(comment => comment.authorId === user.id);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Blog Page</h1>

      <section>
        <h2 className="text-xl font-semibold">My Blogs</h2>
        {myBlogs.length === 0 ? (
          <p>No blogs yet</p>
        ) : (
          myBlogs.map(blog => (
            <div key={blog.id} className="border p-4 rounded-md">
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.category}</p>
              <p>{blog.content}</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">My Comments</h2>
        {myComments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          myComments.map(comment => (
            <div key={comment.id} className="border p-3 rounded-md">
              <p className="text-sm text-gray-600">On Blog #{comment.blogId}</p>
              <p>{comment.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">All Blogs</h2>
        {blogs.map(blog => (
          <div key={blog.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.category}</p>
            <p>{blog.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BlogPage;