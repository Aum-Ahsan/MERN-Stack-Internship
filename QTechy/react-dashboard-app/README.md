# React + Tailwind Dashboard with Cloudinary Upload

A dynamic, production-ready React dashboard application built with modern best practices. This project demonstrates a complete full-stack implementation with React, Tailwind CSS, Cloudinary integration, and a Node.js/Express backend.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)

## 🎯 Features

### Frontend
- **Dynamic Header**: Editable title with Cloudinary image upload
- **Editable Navbar**: 3 customizable navigation links (text + URL)
- **Custom Footer**: Editable contact information (email, phone, address)
- **Dashboard Panel**: Real-time content management interface
- **Image Preview**: Preview images before uploading to Cloudinary
- **LocalStorage Persistence**: Changes persist across browser sessions
- **React Context**: Global state management without prop drilling
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend
- **RESTful API**: Express server with CORS enabled
- **Component Endpoints**: GET/POST/PUT for header, navbar, footer
- **Health Check**: Server status monitoring endpoint
- **In-Memory Storage**: Ready for MongoDB integration

## 📁 Project Structure

```
react-dashboard-app/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # UI Components
│   │   │   ├── Header.jsx    # Dynamic header with image
│   │   │   ├── Navbar.jsx    # Editable navigation links
│   │   │   └── Footer.jsx    # Contact information
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Main display page
│   │   │   └── Dashboard.jsx # Admin control panel
│   │   ├── context/
│   │   │   └── AppContext.jsx # Global state management
│   │   ├── services/
│   │   │   ├── apiService.js      # Backend API calls
│   │   │   └── cloudinaryService.js # Cloudinary uploads
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── .env.example          # Environment template
│   └── package.json
│
├── backend/                  # Node.js + Express backend
│   ├── server.js             # Express server
│   ├── .env.example          # Environment template
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Cloudinary account (free tier available)

### 1. Clone and Install

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Set Up Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → Copy your **Cloud Name**
3. Go to **Settings** → **Upload** → **Upload Presets**
4. Click **Add upload preset**
5. Set **Signing Mode** to **Unsigned**
6. Save and copy the **Preset Name**
7. Add both values to your frontend `.env` file

### 4. Start the Application

```bash
# Terminal 1: Start backend server
cd backend
npm start

# Terminal 2: Start frontend dev server
cd frontend
npm run dev
```

### 5. Open in Browser

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/components
- **Health Check**: http://localhost:5000/health

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/components` | Fetch all component data |
| POST | `/api/components` | Save all component data |
| PUT | `/api/components/header` | Update header only |
| PUT | `/api/components/navbar` | Update navbar only |
| PUT | `/api/components/footer` | Update footer only |
| DELETE | `/api/components/reset` | Reset to defaults |
| GET | `/health` | Server health check |
| GET | `/api` | API documentation |

## 🎨 Component Details

### Header Component
- Displays a dynamic title
- Shows an image uploaded via Cloudinary
- Gradient background with responsive design

### Navbar Component
- 3 horizontal navigation links
- Each link has editable label and URL
- Sticky positioning with shadow

### Footer Component
- Contact information display
- Email (clickable mailto link)
- Phone (clickable tel link)
- Address text
- Copyright with current year

### Dashboard Component
- Tabbed interface for each section
- Real-time preview of changes
- Image upload with preview
- Save to server functionality
- Load from server option
- Reset to defaults button

## 🔧 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Services
- **Cloudinary** - Image hosting and CDN

## 📝 Usage Guide

### Editing Content

1. Click the **⚙️ Dashboard** button (top-right corner)
2. Use the tabbed interface to edit:
   - **Header**: Change title, upload new image
   - **Navbar**: Edit link labels and URLs
   - **Footer**: Update contact information
3. Click individual **Update** buttons for instant changes
4. Use **Save to Server** to persist to backend
5. Click **🏠 Home** to view changes

### Image Upload

1. Go to Dashboard → Header tab
2. Click the upload area or drag an image
3. Preview the image before uploading
4. Click **Upload to Cloudinary**
5. Image URL is automatically saved

## 🔒 Security Notes

- Cloudinary uses unsigned upload presets (safe for client-side)
- Backend CORS is configured for frontend origin only
- Environment variables keep sensitive data secure
- No API keys exposed in frontend code

## 🚧 Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] User authentication
- [ ] Multiple image uploads
- [ ] Dark mode toggle
- [ ] Export/Import configuration
- [ ] Undo/Redo functionality

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Tailwind CSS, and Cloudinary
