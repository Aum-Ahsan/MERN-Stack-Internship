import { useAppContext } from '../context/AppContext';

/**
 * Header Component
 * Displays dynamic title and Cloudinary-uploaded image
 * Styled with Tailwind CSS for responsive design
 */
const Header = () => {
  const { header } = useAppContext();

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-8">
        {/* Header Image */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
          <img
            src={header.imageUrl}
            alt="Header Banner"
            className="w-full h-48 md:h-64 object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x200?text=Header+Image';
            }}
          />
        </div>

        {/* Header Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {header.title}
          </h1>
          <div className="mt-4 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
