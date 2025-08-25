import { useEffect, useState } from "react";
import type { Blog } from "../types/blog";
import useAuth from "../hooks/useAuth";
import blogService from "../services/blogService";
import NavbarBlog from "../components/common/NavbarBlog";
import { Link } from "react-router";
import BlogCard from "../components/common/BlogCard";
import useNotification from "../hooks/useNotification";
import Notification from "../components/common/Notification";
import Footer from "../components/common/Footer";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const {notification, showNotification, hideNotification} = useNotification();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger

  const {user} = useAuth();
    
  const fetchBlogs = async () => {
    try {
      const allBlogs = await blogService.getAllBlogs();
      setBlogs(allBlogs);
      console.log("Fetched blogs:", allBlogs.length);
    } catch (error: any) {
      showNotification("Error fetch blogs", "error");
      console.error("Error fetching blogs:", error);
    }
  }
    
  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger]); // Add refreshTrigger dependency

  useEffect(() => {
    const handleFocus = () => {
      console.log("DEBUG: Window focused, refreshing blogs");
      fetchBlogs();
    };
    
    // Also listen for storage events (when blogs are created)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blogCreated') {
        console.log("DEBUG: New blog created, refreshing");
        setRefreshTrigger(prev => prev + 1);
        // Clean up the flag
        localStorage.removeItem('blogCreated');
      }
    };
    
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  // Manual refresh function
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const filteredBlogs = selectedCategory === "ALL" ? blogs : blogs.filter((filterBlogs) => filterBlogs.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold sm:text-xl lg:text-6xl leading-tight mb-6">
              Create your blog
            </h1>
            <p className="text-blue-600 text-2xl">Share your ideas with users around the world</p>
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
      
      {/* Add refresh button */}
      <div className="max-w-6xl mx-auto mb-4 text-center">
        <button 
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh Blogs
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Not seeing your new blog? Click refresh or wait a moment.
        </p>
      </div>
            
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.length > 0 ?
          filteredBlogs.map((allBlogs) => 
            <Link key={allBlogs.id} to={`/blog/${allBlogs.id}`}>
              <BlogCard blog={allBlogs}/>
            </Link>
        )
        :
          <p className="text-center col-span-3 text-gray-600">
            No Blogs available yet.
          </p>
        }
      </div>

      <div className="mt-150">
        <Footer />
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