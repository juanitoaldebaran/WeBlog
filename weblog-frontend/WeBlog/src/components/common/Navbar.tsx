import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface NavLinkType {
    name: string;
    path: string;
}

const navLinks: NavLinkType[] = [
    {name: 'Home', path: '/'},
    {name: 'About', path: '/about'},
    {name: 'Blog', path: '/blog'}
]

const Navbar: React.FC = () => {
    return (
        <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center h-16">
                    <div className="font-bold text-blue-600 text-2xl">
                        <Link to={'/'}>
                            WeBlog
                        </Link>
                    </div>
                    
                     <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.path}
                                    className={`text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium pb-2 border-b-2 ${
                                        window.location.pathname === link.path 
                                            ? 'text-blue-600 border-blue-500' 
                                            : 'border-transparent hover:border-blue-500'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link to='/auth/login' className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                            Login
                        </Link>
                        <Link to='/auth/signup' className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
                            Get Started
                        </Link>
                        <div>
                            <Link to={'/user'}>
                                 <FontAwesomeIcon icon={faUser} className="cursor-pointer hover:text-blue-600"/>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;