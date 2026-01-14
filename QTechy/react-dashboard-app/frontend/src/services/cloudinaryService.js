/**
 * Cloudinary Upload Service
 * Handles image uploads to Cloudinary using unsigned upload preset
 * 
 * Setup Instructions:
 * 1. Create a Cloudinary account at https://cloudinary.com
 * 2. Go to Settings > Upload > Upload Presets
 * 3. Create an unsigned upload preset
 * 4. Add your cloud name and preset to .env file:
 *    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *    VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Validate Cloudinary configuration
 * @returns {boolean} - Whether configuration is valid
 */
export const isCloudinaryConfigured = () => {
  return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
};

/**
 * Get Cloudinary configuration status
 * @returns {Object} - Configuration status details
 */
export const getCloudinaryStatus = () => {
  return {
    configured: isCloudinaryConfigured(),
    cloudName: CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Missing',
    uploadPreset: CLOUDINARY_UPLOAD_PRESET ? '✓ Set' : '✗ Missing'
  };
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result with isValid and error message
 */
export const validateImageFile = (file) => {
  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, GIF, WebP, or SVG image.' 
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the 10MB limit.` 
    };
  }

  return { isValid: true, error: null };
};

/**
 * Upload image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {Object} options - Upload options
 * @param {Function} options.onProgress - Optional callback for upload progress (0-100)
 * @param {string} options.folder - Optional folder name in Cloudinary
 * @returns {Promise<string>} - Returns the secure URL of uploaded image
 */
export const uploadToCloudinary = async (file, options = {}) => {
  const { onProgress = null, folder = 'dashboard-uploads' } = options;

  // Check configuration
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary configuration is missing. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.'
    );
  }

  // Validate file
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    // Use XMLHttpRequest for progress tracking
    if (onProgress) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              reject(new Error(errorData.error?.message || 'Upload failed'));
            } catch {
              reject(new Error('Upload failed. Please try again.'));
            }
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error. Please check your connection and try again.'));
        });

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload cancelled.'));
        });

        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
        xhr.send(formData);
      });
    }

    // Use fetch for simple uploads without progress
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Upload failed. Please try again.');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('Network')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw error;
  }
};

/**
 * Get optimized image URL with transformations
 * @param {string} url - Original Cloudinary URL
 * @param {Object} options - Transformation options
 * @returns {string} - Transformed URL
 */
export const getOptimizedUrl = (url, options = {}) => {
  const {
    width = 800,
    height = 400,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  // Insert transformations into URL
  const transformations = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  return url.replace('/upload/', `/upload/${transformations}/`);
};
