import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Blog } from "../../types/blog";
import { faCalendar, faEye } from "@fortawesome/free-solid-svg-icons";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex flex-col shadow hover:shadow-lg transition gap-2">
      <img
      src={blog.imageUrl}
      alt={blog.title}
      className="object-cover w-full rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <div>
        <span></span>
      </div>
      <div className="flex items-start justify-center flex-col gap-2">
        <span className="bg-blue-500 text-white rounded-lg py-2 px-1 text-sm">{blog.category}</span>
        <span className="text-sm text-light">{blog.description}</span>
        <div className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faEye} className="text-blue-500 bg-gray-100 p-2 rounded-lg"/>
          <span className="text-sm">{blog.views}</span>
        </div>
        <span className="flex items-center justify-center gap-2 font-light text-sm">
          <FontAwesomeIcon icon={faCalendar} className="bg-gray-100 p-2 rounded-lg"/>
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
