/**
 * API Service
 * Handles communication with backend API
 * Provides functions for fetching and saving component data
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch all component data from backend
 * @returns {Promise<Object>} - Component data (header, navbar, footer)
 */
export const fetchComponentData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/components`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch component data');
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

/**
 * Save all component data to backend
 * @param {Object} data - Component data to save (header, navbar, footer)
 * @returns {Promise<Object>} - Saved data response
 */
export const saveComponentData = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/components`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to save component data');
    }

    return await response.json();
  } catch (error) {
    console.error('API save error:', error);
    throw error;
  }
};

/**
 * Update header data only
 * @param {Object} headerData - Header data to update
 * @returns {Promise<Object>} - Updated header response
 */
export const updateHeader = async (headerData) => {
  try {
    const response = await fetch(`${API_URL}/api/components/header`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(headerData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update header');
    }

    return await response.json();
  } catch (error) {
    console.error('API header update error:', error);
    throw error;
  }
};

/**
 * Update navbar data only
 * @param {Array} navbarLinks - Navbar links array
 * @returns {Promise<Object>} - Updated navbar response
 */
export const updateNavbar = async (navbarLinks) => {
  try {
    const response = await fetch(`${API_URL}/api/components/navbar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ links: navbarLinks }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update navbar');
    }

    return await response.json();
  } catch (error) {
    console.error('API navbar update error:', error);
    throw error;
  }
};

/**
 * Update footer data only
 * @param {Object} footerData - Footer data to update
 * @returns {Promise<Object>} - Updated footer response
 */
export const updateFooter = async (footerData) => {
  try {
    const response = await fetch(`${API_URL}/api/components/footer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(footerData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update footer');
    }

    return await response.json();
  } catch (error) {
    console.error('API footer update error:', error);
    throw error;
  }
};

/**
 * Reset all component data to defaults
 * @returns {Promise<Object>} - Reset response with default data
 */
export const resetComponentData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/components/reset`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to reset component data');
    }

    return await response.json();
  } catch (error) {
    console.error('API reset error:', error);
    throw error;
  }
};

/**
 * Check API health status
 * @returns {Promise<Object>} - Health status response
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API health check error:', error);
    throw error;
  }
};
