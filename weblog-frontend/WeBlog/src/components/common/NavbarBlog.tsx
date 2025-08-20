interface NavbarBlogProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const blogCategories = ["ALL", "TECHNOLOGY", "HEALTH", "FINANCE", "SPORTS", "TRAVEL"];

const NavbarBlog: React.FC<NavbarBlogProps> = ({selectedCategory, setSelectedCategory}) => {
    return (
        <nav className="flex gap-4 items-center justify-center">
            {blogCategories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`border-b-2 font-medium pb-2 text-gray-600 hover:text-blue-600 cursor-pointer ${category === selectedCategory 
                        ? "text-blue-600 border-blue-500"
                        : "border-transparent text-blue-600 border-blue-500 hover:border-blue-600"
                    }`}
                >
                    {category}
                </button>
            ))}
        </nav>
    )
}

export default NavbarBlog;