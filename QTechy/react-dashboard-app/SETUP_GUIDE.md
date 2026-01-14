# 🚀 Quick Setup Guide

## Step-by-Step Instructions

### 1️⃣ Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

---

### 2️⃣ Configure Cloudinary

1. **Create a free account** at [cloudinary.com](https://cloudinary.com/)

2. **Get your credentials:**
   - Login to Cloudinary Dashboard
   - Copy your **Cloud Name** (e.g., `dxxxxxx`)

3. **Create Upload Preset:**
   - Go to **Settings** → **Upload**
   - Scroll to **Upload presets**
   - Click **Add upload preset**
   - Set **Signing Mode** to **Unsigned**
   - Click **Save**
   - Copy the **preset name**

---

### 3️⃣ Setup Environment Variables

**Frontend `.env` file:**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
VITE_API_URL=http://localhost:5000
```

**Backend `.env` file (optional):**
```bash
cd backend
cp .env.example .env
```

---

### 4️⃣ Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
✅ Backend running on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

---

### 5️⃣ Access the Application

1. **Open browser:** `http://localhost:5173`
2. **View Home Page** with Header, Navbar, Footer
3. **Click "⚙️ Dashboard"** button (top-right)
4. **Make changes** in the Dashboard
5. **See updates** instantly on the Home page

---

## ✅ Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Cloudinary account created
- [ ] Upload preset created (Unsigned mode)
- [ ] Frontend `.env` configured
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5173)
- [ ] Can access home page
- [ ] Can access dashboard
- [ ] Can update header title
- [ ] Can upload image to Cloudinary
- [ ] Can update navbar links
- [ ] Can update footer info

---

## 🎯 Quick Test

1. **Go to Dashboard**
2. **Change header title** → Click "Update Title"
3. **Upload an image** → See it in header
4. **Edit navbar link** → Click "Update Navbar"
5. **Switch to Home** → See all changes applied

---

## 🐛 Common Issues

**Issue:** Cloudinary upload fails
- **Fix:** Check Cloud Name and Upload Preset in `.env`
- **Fix:** Ensure preset is set to "Unsigned"

**Issue:** Backend connection error
- **Fix:** Ensure backend is running on port 5000
- **Fix:** Check `VITE_API_URL` in frontend `.env`

**Issue:** Styles not loading
- **Fix:** Run `npm install` in frontend
- **Fix:** Restart dev server

---

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the code structure
- Customize components and styles
- Add new features

---

**Need Help?** Check the [README.md](README.md) for comprehensive documentation.
