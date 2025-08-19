import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {

  return (
    <footer className="w-full bg-blue-600 text-white">
      <div className="px-6 md:px-12 py-10 text-center md:text-left">
        <h1 className="text-3xl font-semibold mb-2">Start sharing your stories</h1>
        <h2 className="text-lg font-light">Join other users to share your stories</h2>
      </div>


      <div className="border-white/30 px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            WeBlog
          </Link>
        </div>

        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-gray-200">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaInstagram />
          </a>
        </div>
      </div>


      <div className="text-center text-sm py-4 border-white/20">
        <p>© 2025 WeBlog | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
