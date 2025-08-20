import type React from "react";
import authService from "../../services/authService";
import { Link } from "react-router";

const NavbarUser: React.FC = () => {
    const handleLogOut = () => {
        try {
            authService.logout();
        } catch (error: any) {
            console.error(error?.response?.status?.message || "Error logging out");
        }
    }

    return (
         <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center h-16">
                    <div>
                        <Link to='/' className="font-bold text-blue-600 text-2xl">WeBlog</Link>
                    </div>
                    <div>
                        <button onClick={handleLogOut} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavbarUser;