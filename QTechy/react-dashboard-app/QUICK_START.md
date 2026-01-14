# ⚡ Quick Start - How to Run

## 🎯 Simple 4-Step Process

### Step 1: Setup Cloudinary (One-time setup)

1. Go to [cloudinary.com](https://cloudinary.com/) and create a **FREE account**
2. After login, you'll see your **Dashboard**
3. Copy your **Cloud Name** (looks like: `dxxxxxx`)
4. Go to **Settings** → **Upload** → **Upload presets**
5. Click **"Add upload preset"**
6. Set **Signing Mode** to **"Unsigned"**
7. Click **Save** and copy the **preset name**

---

### Step 2: Configure Frontend

Open terminal and run:

```bash
cd react-dashboard-app/frontend
```

Create `.env` file:
```bash
# On Windows
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

Edit the `.env` file and add your Cloudinary credentials:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
VITE_API_URL=http://localhost:5000
```

---

### Step 3: Start Backend Server

Open **Terminal 1** and run:

```bash
cd react-dashboard-app/backend
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📊 API available at http://localhost:5000/api/components
💚 Health check at http://localhost:5000/health
```

✅ **Keep this terminal running!**

---

### Step 4: Start Frontend Server

Open **Terminal 2** (new terminal) and run:

```bash
cd react-dashboard-app/frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Keep this terminal running too!**

---

## 🎉 Access Your Application

1. **Open browser** and go to: `http://localhost:5173`
2. You'll see the **Home Page** with Header, Navbar, and Footer
3. Click the **"⚙️ Dashboard"** button in the top-right corner
4. Now you can:
   - Change the header title
   - Upload images to Cloudinary
   - Edit navbar links
   - Update footer information
5. Click **"🏠 Home"** to see your changes instantly!

---

## 🧪 Quick Test

Try this to verify everything works:

1. **Go to Dashboard** (click ⚙️ Dashboard button)
2. **Change Header Title**:
   - Type "My Awesome Dashboard" in the title field
   - Click "Update Title"
3. **Upload an Image**:
   - Click "Choose File"
   - Select any image from your computer
   - Click "Upload to Cloudinary"
   - Wait for upload to complete
4. **Switch to Home** (click 🏠 Home button)
5. **See your changes!** The title and image should be updated

---

## 📝 Important Notes

- **Both servers must be running** (backend on port 5000, frontend on port 5173)
- **Don't close the terminals** while using the app
- **Changes are saved** in localStorage, so they persist even after refresh
- **Cloudinary credentials are required** for image upload to work

---

## 🐛 Troubleshooting

### Problem: "Cannot find module" error
**Solution:** Run `npm install` in both frontend and backend directories

### Problem: Image upload fails
**Solution:** 
- Check your Cloudinary credentials in `frontend/.env`
- Make sure upload preset is set to "Unsigned" mode
- Verify Cloud Name and Preset Name are correct

### Problem: Backend connection error
**Solution:**
- Make sure backend server is running on port 5000
- Check if `VITE_API_URL=http://localhost:5000` in frontend `.env`

### Problem: Port already in use
**Solution:**
- Backend: Change `PORT=5000` to another port in `backend/.env`
- Frontend: It will automatically suggest another port

---

## 🎯 What You Can Do

### In the Dashboard:
- ✏️ Edit header title
- 📸 Upload images to Cloudinary
- 🔗 Customize navigation links (labels + URLs)
- 📧 Update contact information (email, phone, address)

### Features:
- ⚡ Real-time updates (no page refresh needed)
- 💾 Data persists in localStorage
- 📱 Fully responsive design
- 🎨 Professional UI with Tailwind CSS

---

## 🚀 Next Steps

- Explore the code in `frontend/src/` directory
- Check out [`README.md`](README.md) for detailed documentation
- Customize components and styles
- Add your own features!

---

**Need more help?** Check the full documentation in [`README.md`](README.md) or [`SETUP_GUIDE.md`](SETUP_GUIDE.md)
