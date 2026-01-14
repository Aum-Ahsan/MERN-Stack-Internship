import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

/**
 * Main App Component
 * Provides routing between Home and Dashboard views
 * Uses React Context for global state management
 */
function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {/* View Toggle Button - Fixed Position */}
        <div className="fixed top-4 right-4 z-[100]">
          <button
            onClick={() => setCurrentView(currentView === 'home' ? 'dashboard' : 'home')}
            className={`px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 ${
              currentView === 'home'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {currentView === 'home' ? (
              <>
                <span>⚙️</span>
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <span>🏠</span>
                <span>Home</span>
              </>
            )}
          </button>
        </div>

        {/* Render Current View */}
        {currentView === 'home' ? <Home /> : <Dashboard />}
      </div>
    </AppProvider>
  );
}

export default App;
