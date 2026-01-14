import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Home Page Component
 * Displays the main page with Header, Navbar, and Footer
 * All content is dynamically controlled via the Dashboard
 */
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Dynamic Dashboard
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                A production-ready React dashboard application built with modern best practices.
                All content on this page is dynamically controlled through the Dashboard panel.
              </p>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Dynamic Header</h3>
                <p className="text-gray-700">
                  Update the header title and upload images directly to Cloudinary with real-time preview.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Editable Navbar</h3>
                <p className="text-gray-700">
                  Customize navigation links with labels and URLs. Changes reflect instantly.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Custom Footer</h3>
                <p className="text-gray-700">
                  Manage contact information including email, phone, and address from the dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              ✨ Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Real-time updates without page refresh</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Cloudinary integration for image uploads</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">React Context for global state management</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">LocalStorage persistence</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Backend API with Node.js + Express</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Professional UI with Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              🛠️ Technology Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                React + Vite
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                Cloudinary
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                Node.js + Express
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                React Context API
              </span>
            </div>
            <p className="text-center mt-6 text-white/80">
              Click the <strong>⚙️ Dashboard</strong> button in the top-right corner to start customizing!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
