import { useEffect, useState } from "react";
import type { Blog } from "../types/blog";
import { useAuth } from "../hooks/useAuth";
import blogService from "../services/blogService";
import NavbarBlog from "../components/common/NavbarBlog";
import { Link } from "react-router";
import BlogCard from "../components/common/BlogCard";
import useNotification from "../hooks/useNotification";
import Notification from "../components/common/Notification";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const {notification, showNotification, hideNotification} = useNotification();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const {user} = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogs = await blogService.getAllBlogs();
        setBlogs(allBlogs);
      } catch (error: any) {
        showNotification("Error fetch blogs", "error");
      }
    }

    fetchBlogs();
  }, [])

  const filteredBlogs = selectedCategory === "ALL" ? blogs : blogs.filter((filterBlogs) => filterBlogs.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
       <section className="pt-40 pb-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold sm:text-xl lg:text-6xl leading-tight mb-6">
                            Create your blog
                        </h1>
                        <p className="text-blue-600 text-2xl">Share your ideas with user arround the world</p>
                    </div>
                </div>
        </section>

      {!user && (
        <div className="max-w-2xl mx-auto mb-12 bg-blue-50 p-6 rounded-2xl text-center">
          <h2 className="text-lg font-semibold text-yellow-800">
            🔒 You must sign in to create a blog
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Please <Link to={"/auth/login"} className="text-blue-600 hover:underline"> Login </Link>
            or Create an account <Link to={"/auth/signup"} className="text-blue-600 hover:underline">Sign Up </Link>
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-12">
        <NavbarBlog selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      </div>
      

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.length > 0 ?
          filteredBlogs.map((allBlogs) => 
            <Link to={`/blog/${allBlogs.id}`}>
              <BlogCard blog={allBlogs}/>
            </Link>
        )
        :
          <p className="text-center col-span-3 text-gray-600">
            No Blogs available yet.
          </p>
        }
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
}

export default BlogPage;