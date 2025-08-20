import type { Blog } from "../../types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{blog.description}</p>
      <div className="flex justify-between items-center mt-auto text-sm text-gray-500">
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
          {blog.category}
        </span>
        <span>{blog.views} views</span>
      </div>
      <span className="text-xs text-gray-400 mt-2">
        {new Date(blog.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}
