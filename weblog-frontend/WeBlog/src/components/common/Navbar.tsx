import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';

interface NavLinkType {
    name: string;
    path: string;
}

const navLinks: NavLinkType[] = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Blog", path: "/blog"}
]

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuthContext();
    const {user} = useAuth();

    return (
       <header className="fixed w-full top-0 z-50 backdrop-blur shadow bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto sm:px-4 md:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-20">
                <div className="font-bold text-2xl text-blue-600 cursor-pointer">
                    <Link to={'/'}>
                        WeBlog
                    </Link>
                </div>

                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.path}
                                className={`text-gray-700 border-b-2 pb-2 hover:text-blue-600 duration-200 transition-all
                                ${window.location.pathname === link.path ? `border-blue-600 w-full` : `border-transparent hover:border-blue-600`} `}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="text-gray-700">
                    {!isAuthenticated ? (
                        <div className="flex items-center justify-center gap-2">
                            <Link to={'/auth/login'} className="cursor-pointer hover:text-blue-600">
                                Login
                            </Link>
                            <span>|</span>
                            <Link to={'/auth/signup'} className="cursor-pointer hover:text-blue-600">
                                Get Started
                            </Link>
                        </div>
                    ) : (
                            <Link to={'/user'} className="flex items-center justify-center gap-2 rounded bg-gray-50 p-2 shadow cursor-pointer hover:bg-gray-100">
                                <FontAwesomeIcon icon={faUser}/>
                                <p >{user?.firstName}</p>
                            </Link>
                    )}
                </div>
            </nav>
        </div>
       </header>
    )
}

export default Navbar;