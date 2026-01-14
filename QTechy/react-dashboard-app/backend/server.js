/**
 * Express Backend Server
 * Provides API endpoints for dashboard component data
 * Supports CORS for frontend communication
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// In-memory storage (replace with MongoDB for production)
let componentData = {
  header: {
    title: 'Welcome to My Dashboard',
    imageUrl: 'https://via.placeholder.com/800x200?text=Header+Image'
  },
  navbar: [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ],
  footer: {
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, Country'
  }
};

/**
 * GET /api/components
 * Fetch all component data
 */
app.get('/api/components', (req, res) => {
  try {
    console.log('📥 GET /api/components - Fetching component data');
    res.json({
      success: true,
      data: componentData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error fetching components:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch component data',
      error: error.message
    });
  }
});

/**
 * POST /api/components
 * Save/update component data
 */
app.post('/api/components', (req, res) => {
  try {
    const { header, navbar, footer } = req.body;
    console.log('📤 POST /api/components - Saving component data');

    // Validate and update component data
    if (header) {
      if (header.title !== undefined) {
        componentData.header.title = header.title;
      }
      if (header.imageUrl !== undefined) {
        componentData.header.imageUrl = header.imageUrl;
      }
    }

    if (navbar && Array.isArray(navbar)) {
      // Validate navbar structure
      const validNavbar = navbar.every(link => 
        typeof link === 'object' && 
        typeof link.label === 'string' && 
        typeof link.url === 'string'
      );
      
      if (validNavbar) {
        componentData.navbar = navbar;
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid navbar format. Each link must have label and url strings.'
        });
      }
    }

    if (footer) {
      if (footer.email !== undefined) {
        componentData.footer.email = footer.email;
      }
      if (footer.phone !== undefined) {
        componentData.footer.phone = footer.phone;
      }
      if (footer.address !== undefined) {
        componentData.footer.address = footer.address;
      }
    }

    console.log('✅ Component data updated successfully');
    res.json({
      success: true,
      message: 'Component data updated successfully',
      data: componentData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error saving components:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save component data',
      error: error.message
    });
  }
});

/**
 * PUT /api/components/header
 * Update header data only
 */
app.put('/api/components/header', (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    console.log('📤 PUT /api/components/header - Updating header');

    if (title !== undefined) {
      componentData.header.title = title;
    }
    if (imageUrl !== undefined) {
      componentData.header.imageUrl = imageUrl;
    }

    res.json({
      success: true,
      message: 'Header updated successfully',
      data: componentData.header
    });
  } catch (error) {
    console.error('❌ Error updating header:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update header',
      error: error.message
    });
  }
});

/**
 * PUT /api/components/navbar
 * Update navbar data only
 */
app.put('/api/components/navbar', (req, res) => {
  try {
    const { links } = req.body;
    console.log('📤 PUT /api/components/navbar - Updating navbar');

    if (links && Array.isArray(links)) {
      componentData.navbar = links;
    }

    res.json({
      success: true,
      message: 'Navbar updated successfully',
      data: componentData.navbar
    });
  } catch (error) {
    console.error('❌ Error updating navbar:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update navbar',
      error: error.message
    });
  }
});

/**
 * PUT /api/components/footer
 * Update footer data only
 */
app.put('/api/components/footer', (req, res) => {
  try {
    const { email, phone, address } = req.body;
    console.log('📤 PUT /api/components/footer - Updating footer');

    if (email !== undefined) {
      componentData.footer.email = email;
    }
    if (phone !== undefined) {
      componentData.footer.phone = phone;
    }
    if (address !== undefined) {
      componentData.footer.address = address;
    }

    res.json({
      success: true,
      message: 'Footer updated successfully',
      data: componentData.footer
    });
  } catch (error) {
    console.error('❌ Error updating footer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update footer',
      error: error.message
    });
  }
});

/**
 * DELETE /api/components/reset
 * Reset all component data to defaults
 */
app.delete('/api/components/reset', (req, res) => {
  try {
    console.log('🔄 DELETE /api/components/reset - Resetting to defaults');
    
    componentData = {
      header: {
        title: 'Welcome to My Dashboard',
        imageUrl: 'https://via.placeholder.com/800x200?text=Header+Image'
      },
      navbar: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' }
      ],
      footer: {
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, City, Country'
      }
    };

    res.json({
      success: true,
      message: 'Component data reset to defaults',
      data: componentData
    });
  } catch (error) {
    console.error('❌ Error resetting components:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset component data',
      error: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * API info endpoint
 */
app.get('/api', (req, res) => {
  res.json({
    name: 'React Dashboard API',
    version: '1.0.0',
    endpoints: {
      'GET /api/components': 'Fetch all component data',
      'POST /api/components': 'Save all component data',
      'PUT /api/components/header': 'Update header only',
      'PUT /api/components/navbar': 'Update navbar only',
      'PUT /api/components/footer': 'Update footer only',
      'DELETE /api/components/reset': 'Reset to defaults',
      'GET /health': 'Health check'
    }
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                                                        ║');
  console.log(`║   🚀 Server running on http://localhost:${PORT}           ║`);
  console.log('║                                                        ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log('║   Available Endpoints:                                 ║');
  console.log(`║   📊 API:     http://localhost:${PORT}/api/components     ║`);
  console.log(`║   💚 Health:  http://localhost:${PORT}/health             ║`);
  console.log(`║   📖 Info:    http://localhost:${PORT}/api                ║`);
  console.log('║                                                        ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
});
