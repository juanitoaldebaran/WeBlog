import { useState } from "react";
import type { Blog } from "../../types/blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface AddBlogProps {
    onBlogCreated: () => void;
}

const AddBlog: React.FC<AddBlogProps> = ({onBlogCreated}) => {
    const [blogData, setBlogData] = useState<Blog>({
        imageUrl: "",
        title: "",
        content: "",
        category: "TECHNOLOGY",
        description: "",
    } as Blog);

    const categories = [
        "TECHNOLOGY",
        "HEALTH",
        "FINANCE",
        "SPORT",
        "TRAVEL"
    ]

    return (
        <div className="bg-white space-y-8 w-200 rounded">
            <form className="mt-20 p-6 rounded flex flex-col">
                <div className="flex items-center gap-4">
                    <label>
                        Upload Image
                    </label>
                    <FontAwesomeIcon icon={faUpload}/>
                    <input
                        value={blogData.imageUrl}
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Add"
                        className=""
                    >
                    </input>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-lg">
                        Blog Title
                    </label>
                    <input
                        value={blogData.title}
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        className="w-full rounded bg-gray-50 border p-2"
                    >
                    </input>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-lg">
                        Blog Content
                    </label>
                    <input
                        value={blogData.title}
                        id="content"
                        name="content"
                        placeholder="Enter content"
                        className="w-full rounded bg-gray-50 border p-2"
                    >
                    </input>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-lg">
                        Blog Title
                    </label>
                    <select>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-lg">
                        Blog Description
                    </label>
                    <input
                        value={blogData.title}
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        className="w-full rounded bg-gray-50 border p-2"
                    >
                    </input>
                </div>
                </form>
        </div>
    )
}

export default AddBlog;