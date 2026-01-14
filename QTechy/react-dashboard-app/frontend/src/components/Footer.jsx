import { useAppContext } from '../context/AppContext';

/**
 * Footer Component
 * Displays editable contact information (email, phone, address)
 * Styled with Tailwind CSS for responsive design
 */
const Footer = () => {
  const { footer } = useAppContext();

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Email */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📧</span>
              <h3 className="text-lg font-semibold text-blue-400">Email</h3>
            </div>
            <a
              href={`mailto:${footer.email}`}
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
            >
              {footer.email}
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📞</span>
              <h3 className="text-lg font-semibold text-blue-400">Phone</h3>
            </div>
            <a
              href={`tel:${footer.phone}`}
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
            >
              {footer.phone}
            </a>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center md:items-start group">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📍</span>
              <h3 className="text-lg font-semibold text-blue-400">Address</h3>
            </div>
            <p className="text-gray-300">{footer.address}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Dynamic Dashboard. All rights reserved.
            </p>
            
            {/* Built with */}
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Built with 
              <span className="text-blue-400">React</span> + 
              <span className="text-cyan-400">Tailwind CSS</span> + 
              <span className="text-yellow-400">Cloudinary</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
