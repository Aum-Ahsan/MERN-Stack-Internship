import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchComponentData, saveComponentData } from '../services/apiService';

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Initialize state from localStorage or use defaults
  const [header, setHeader] = useState(() => {
    const saved = localStorage.getItem('dashboardHeader');
    return saved ? JSON.parse(saved) : {
      title: 'Welcome to My Dashboard',
      imageUrl: 'https://via.placeholder.com/800x200?text=Header+Image'
    };
  });

  const [navbar, setNavbar] = useState(() => {
    const saved = localStorage.getItem('dashboardNavbar');
    return saved ? JSON.parse(saved) : [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Contact', url: '/contact' }
    ];
  });

  const [footer, setFooter] = useState(() => {
    const saved = localStorage.getItem('dashboardFooter');
    return saved ? JSON.parse(saved) : {
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, City, Country'
    };
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dashboardHeader', JSON.stringify(header));
  }, [header]);

  useEffect(() => {
    localStorage.setItem('dashboardNavbar', JSON.stringify(navbar));
  }, [navbar]);

  useEffect(() => {
    localStorage.setItem('dashboardFooter', JSON.stringify(footer));
  }, [footer]);

  // Update functions
  const updateHeader = (newHeader) => {
    setHeader(prev => ({ ...prev, ...newHeader }));
  };

  const updateNavbar = (newNavbar) => {
    setNavbar(newNavbar);
  };

  const updateFooter = (newFooter) => {
    setFooter(prev => ({ ...prev, ...newFooter }));
  };

  // Fetch data from backend API
  const fetchFromServer = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchComponentData();
      if (response.success && response.data) {
        const { header: serverHeader, navbar: serverNavbar, footer: serverFooter } = response.data;
        if (serverHeader) setHeader(serverHeader);
        if (serverNavbar) setNavbar(serverNavbar);
        if (serverFooter) setFooter(serverFooter);
      }
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to fetch data from server');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Save all data to backend API
  const saveToServer = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await saveComponentData({ header, navbar, footer });
      if (response.success) {
        setLastSaved(new Date().toISOString());
      }
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to save data to server');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [header, navbar, footer]);

  // Reset to default values
  const resetToDefaults = () => {
    const defaultHeader = {
      title: 'Welcome to My Dashboard',
      imageUrl: 'https://via.placeholder.com/800x200?text=Header+Image'
    };
    const defaultNavbar = [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Contact', url: '/contact' }
    ];
    const defaultFooter = {
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, City, Country'
    };

    setHeader(defaultHeader);
    setNavbar(defaultNavbar);
    setFooter(defaultFooter);
  };

  const value = {
    // State
    header,
    navbar,
    footer,
    loading,
    error,
    lastSaved,
    // Update functions
    updateHeader,
    updateNavbar,
    updateFooter,
    // Server functions
    fetchFromServer,
    saveToServer,
    resetToDefaults,
    // Clear error
    clearError: () => setError(null)
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
