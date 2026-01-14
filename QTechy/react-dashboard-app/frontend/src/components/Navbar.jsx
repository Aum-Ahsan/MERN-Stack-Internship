import { useAppContext } from '../context/AppContext';

/**
 * Navbar Component
 * Displays 3 editable navigation links horizontally
 * Styled with Tailwind CSS for responsive design
 */
const Navbar = () => {
  const { navbar } = useAppContext();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Dashboard
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6 md:space-x-8">
            {navbar.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-gray-700 hover:text-blue-600 font-medium text-base md:text-lg transition-all duration-200 hover:underline underline-offset-4 decoration-2 decoration-blue-600"
                  onClick={(e) => {
                    // Prevent default navigation for demo purposes
                    e.preventDefault();
                    console.log(`Navigating to: ${link.url}`);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
