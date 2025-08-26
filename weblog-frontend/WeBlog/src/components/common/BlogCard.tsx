import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Blog } from "../../types/blog";
import { faCalendar, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const {user} = useAuth();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/api/placeholder/400/200';
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {blog.description}
        </p>

        {/* Meta Information */}
        <div className="mt-auto space-y-2">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FontAwesomeIcon icon={faUser} className="text-xs" />
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </div>

          {/* Date and Views */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              <span>{formatDate(blog.createdAt || '')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEye} className="text-xs" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}