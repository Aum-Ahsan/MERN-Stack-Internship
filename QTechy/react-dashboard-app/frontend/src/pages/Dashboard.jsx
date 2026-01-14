import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { uploadToCloudinary } from '../services/cloudinaryService';

/**
 * Dashboard Component
 * Admin panel to control all UI content (Header, Navbar, Footer)
 * Includes Cloudinary image upload functionality and backend sync
 */
const Dashboard = () => {
  const { 
    header, 
    navbar, 
    footer, 
    loading,
    error,
    lastSaved,
    updateHeader, 
    updateNavbar, 
    updateFooter,
    saveToServer,
    fetchFromServer,
    resetToDefaults,
    clearError
  } = useAppContext();

  // Local state for form inputs
  const [headerTitle, setHeaderTitle] = useState(header.title);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const [navLinks, setNavLinks] = useState(navbar);
  const [footerData, setFooterData] = useState(footer);

  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('header');

  // Sync local state when context changes
  useEffect(() => {
    setHeaderTitle(header.title);
  }, [header.title]);

  useEffect(() => {
    setNavLinks(navbar);
  }, [navbar]);

  useEffect(() => {
    setFooterData(footer);
  }, [footer]);

  /**
   * Show success message temporarily
   */
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  /**
   * Handle image file selection and preview
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      setImageFile(file);
      setUploadError('');
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Upload image to Cloudinary and update header
   */
  const handleImageUpload = async () => {
    if (!imageFile) {
      setUploadError('Please select an image first');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const imageUrl = await uploadToCloudinary(imageFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      updateHeader({ imageUrl });
      showSuccess('Image uploaded successfully!');
      setImageFile(null);
      setImagePreview(null);
      
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      setUploadError(error.message || 'Failed to upload image');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  /**
   * Clear selected image
   */
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadError('');
  };

  /**
   * Update header title
   */
  const handleHeaderUpdate = () => {
    updateHeader({ title: headerTitle });
    showSuccess('Header title updated successfully!');
  };

  /**
   * Update navbar links
   */
  const handleNavbarUpdate = () => {
    updateNavbar(navLinks);
    showSuccess('Navbar updated successfully!');
  };

  /**
   * Update footer information
   */
  const handleFooterUpdate = () => {
    updateFooter(footerData);
    showSuccess('Footer updated successfully!');
  };

  /**
   * Handle navbar link changes
   */
  const handleNavLinkChange = (index, field, value) => {
    const updatedLinks = [...navLinks];
    updatedLinks[index][field] = value;
    setNavLinks(updatedLinks);
  };

  /**
   * Save all changes to server
   */
  const handleSaveToServer = async () => {
    // First update all local changes to context
    updateHeader({ title: headerTitle });
    updateNavbar(navLinks);
    updateFooter(footerData);
    
    // Then save to server
    const result = await saveToServer();
    if (result.success) {
      showSuccess('All changes saved to server successfully!');
    }
  };

  /**
   * Fetch data from server
   */
  const handleFetchFromServer = async () => {
    const result = await fetchFromServer();
    if (result.success) {
      showSuccess('Data loaded from server successfully!');
    }
  };

  /**
   * Reset all to defaults
   */
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      resetToDefaults();
      showSuccess('Settings reset to defaults!');
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'header', label: 'Header', icon: '🎨' },
    { id: 'navbar', label: 'Navbar', icon: '🔗' },
    { id: 'footer', label: 'Footer', icon: '📧' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ⚙️ Dashboard Control Panel
              </h1>
              <p className="text-gray-600">Manage your website content in real-time</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <button
                onClick={handleFetchFromServer}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? '⏳' : '📥'} Load from Server
              </button>
              <button
                onClick={handleSaveToServer}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? '⏳' : '💾'} Save to Server
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                🔄 Reset
              </button>
            </div>
          </div>
          
          {/* Last saved indicator */}
          {lastSaved && (
            <div className="mt-4 text-sm text-gray-500">
              Last saved to server: {new Date(lastSaved).toLocaleString()}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span>❌ {error}</span>
            <button onClick={clearError} className="text-red-700 hover:text-red-900">✕</button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <span>✅ {successMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Header Tab */}
            {activeTab === 'header' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Header Settings</h2>
                
                {/* Title Input */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Header Title
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter header title"
                    />
                    <button
                      onClick={handleHeaderUpdate}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
                    >
                      Update Title
                    </button>
                  </div>
                </div>

                {/* Current Image Display */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Header Image
                  </label>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={header.imageUrl}
                      alt="Current Header"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x200?text=Header+Image';
                      }}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Upload New Image (Cloudinary)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer"
                    >
                      <div className="text-gray-500">
                        <span className="text-4xl block mb-2">📷</span>
                        <span className="text-blue-600 hover:text-blue-700">Click to select an image</span>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-600 font-medium">Preview:</p>
                        <button
                          onClick={handleClearImage}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕ Clear
                        </button>
                      </div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}

                  {/* Upload Progress */}
                  {uploadProgress > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{uploadProgress}% uploaded</p>
                    </div>
                  )}

                  {/* Upload Error */}
                  {uploadError && (
                    <div className="mt-3 text-red-600 text-sm flex items-center gap-2">
                      <span>⚠️</span> {uploadError}
                    </div>
                  )}

                  {/* Upload Button */}
                  <button
                    onClick={handleImageUpload}
                    disabled={uploading || !imageFile}
                    className={`mt-4 w-full px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${
                      uploading || !imageFile
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    }`}
                  >
                    {uploading ? '⏳ Uploading...' : '☁️ Upload to Cloudinary'}
                  </button>
                </div>
              </div>
            )}

            {/* Navbar Tab */}
            {activeTab === 'navbar' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Navbar Settings</h2>
                <p className="text-gray-600 mb-4">Configure your navigation links (text and URLs)</p>
                
                {navLinks.map((link, index) => (
                  <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      Navigation Link {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1 font-medium">
                          Link Label
                        </label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleNavLinkChange(index, 'label', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Home"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1 font-medium">
                          Link URL
                        </label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleNavLinkChange(index, 'url', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., /home or https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={handleNavbarUpdate}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  💾 Update Navbar Links
                </button>
              </div>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Footer Settings</h2>
                <p className="text-gray-600 mb-4">Update your contact information displayed in the footer</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span>📧</span> Email Address
                    </label>
                    <input
                      type="email"
                      value={footerData.email}
                      onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contact@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span>📞</span> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={footerData.phone}
                      onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <span>📍</span> Address
                    </label>
                    <input
                      type="text"
                      value={footerData.address}
                      onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Main Street, City, Country"
                    />
                  </div>
                </div>

                <button
                  onClick={handleFooterUpdate}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  💾 Update Footer Information
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Quick Tips</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Changes are automatically saved to localStorage for persistence
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Use "Save to Server" to persist data to the backend database
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Preview images before uploading to Cloudinary
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              All changes reflect immediately on the Home page
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
