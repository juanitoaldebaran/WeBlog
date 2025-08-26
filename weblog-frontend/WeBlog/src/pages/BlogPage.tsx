import { useEffect, useState } from "react";
import type { Blog } from "../types/blog";
import useAuth from "../hooks/useAuth";
import blogService from "../services/blogService";
import NavbarBlog from "../components/common/NavbarBlog";
import { Link } from "react-router-dom";
import BlogCard from "../components/common/BlogCard";
import useNotification from "../hooks/useNotification";
import Notification from "../components/common/Notification";
import Footer from "../components/common/Footer";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const {notification, showNotification, hideNotification} = useNotification();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {user} = useAuth();
    
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const allBlogs = await blogService.getAllBlogs();
      setBlogs(allBlogs);
      console.log("Fetched blogs:", allBlogs.length);
    } catch (error: any) {
      showNotification("Error fetch blogs", "error");
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }
    
  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger]); 

  useEffect(() => {
    const handleFocus = () => {
      console.log("DEBUG: Window focused, refreshing blogs");
      fetchBlogs();
    };
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blogCreated') {
        console.log("DEBUG: New blog created, refreshing");
        setRefreshTrigger(prev => prev + 1);
        localStorage.removeItem('blogCreated');
      }
    };

    // Listen for custom blog created events
    const handleBlogCreated = () => {
      console.log("DEBUG: Blog created event received");
      setRefreshTrigger(prev => prev + 1);
    };
    
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("blogCreated", handleBlogCreated);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("blogCreated", handleBlogCreated);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const filteredBlogs = selectedCategory === "ALL" ? blogs : blogs.filter((filterBlogs) => filterBlogs.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold sm:text-4xl lg:text-6xl leading-tight mb-6 text-gray-800">
              Discover Amazing Blogs
            </h1>
            <p className="text-blue-600 text-xl lg:text-2xl">Share your ideas with users around the world</p>
          </div>
        </div>
      </section>

      {!user && (
        <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl text-center mx-4 border border-blue-100">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to create and share your own blogs with the world
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to={"/auth/login"} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              to={"/auth/signup"} 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="max-w-6xl mx-auto mb-8 px-4">
        <NavbarBlog selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      </div>
      
      {/* Refresh Button */}
      <div className="max-w-6xl mx-auto mb-8 text-center px-4">
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Refresh Blogs"}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Not seeing your new blog? Click refresh or wait a moment.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading amazing blogs...</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {selectedCategory === "ALL" 
                  ? `Showing ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''}` 
                  : `${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''} in ${selectedCategory}`
                }
              </p>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.id}`} className="block h-full">
                    <BlogCard blog={blog} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {selectedCategory === "ALL" ? "No Blogs Available Yet" : `No ${selectedCategory} Blogs Found`}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {selectedCategory === "ALL" 
                      ? "Be the first to share your story with the community!" 
                      : `No blogs found in the ${selectedCategory} category. Try a different category or create the first one!`
                    }
                  </p>
                  {user && (
                    <Link 
                      to="/create-blog" 
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Create Your First Blog
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

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