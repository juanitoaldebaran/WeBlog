import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";


interface FooterLinkType {
  name: string;
  path: string;
}

const footerLinks: FooterLinkType[] = [
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
];

const Footer: React.FC = () => {
  const location = useLocation();

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

        <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          {footerLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`pb-1 transition-all duration-200 ${
                  location.pathname === link.path
                    ? "border-b-2 border-white font-semibold"
                    : "hover:text-gray-200 hover:border-b hover:border-gray-200"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        Socials
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
