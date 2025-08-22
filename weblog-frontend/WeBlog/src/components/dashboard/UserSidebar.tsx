import React from "react";

interface UserSidebarProps {
    activeTab: string;
    onChangeTab: (tab: string) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({onChangeTab, activeTab}) => {
    const userTabType = [
        {id: "dashboard", label: "Dashboard"},
        {id: "add-blog", label: "Add blog"},
        {id: "my-blog", label: "My blog"},
        {id: "my-comments", label: "My comment"},
    ]

    return (
       <nav className="fixed w-64  h-[calc(100vh-80px)] top-20 left-0 bg-white text-black p-2">
        <ul>
           {userTabType.map((menu) => (
            <li
                key={menu.id}
            >
                <button
                    onClick={() => onChangeTab(menu.id)}
                    className={`cursor-pointer text-2lg w-full text-left py-6 px-3 rounded transition-colors duration-200
                        ${activeTab === menu.id ? `bg-blue-600 font-semibold text-white` : `hover:bg-gray-100`}
                        `}
                >
                    {menu.label}
                </button>
            </li>
           ))}
        </ul>
       </nav>
    )
}

export default UserSidebar;
