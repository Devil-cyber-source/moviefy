# 🎬 Moviefy - Complete Guide

## 🚀 Quick Start

### Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📱 Access from Network

**Your IP:** `172.16.2.39`

**From any device on same WiFi:**
```
http://172.16.2.39:5173
```

---

## 🔐 Login Methods

### 1. Email Login
- Email: `admin@moviefy.com`
- Password: `admin123`

### 2. Google Login
- Click "Continue with Google"
- Instant demo login (no configuration needed)

### 3. Phone Login
- Enter phone number
- Use OTP: `123456`

---

## ✅ Features

- ✅ Google login (working)
- ✅ Mobile responsive
- ✅ Lazy loading images
- ✅ Performance optimized
- ✅ Error boundaries
- ✅ Network access enabled
- ✅ MongoDB database
- ✅ Admin panel
- ✅ Subscription system
- ✅ Referral system
- ✅ Watch party
- ✅ Continue watching

---

## 🌍 Deploy to Internet

### Option 1: Ngrok (Quick)
```bash
ngrok http 5173
```

### Option 2: Render (Free, Permanent)
1. Go to https://render.com
2. Connect GitHub repo
3. Deploy backend + frontend
4. Done!

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT + Google OAuth
- **Styling:** CSS

---

## 📝 Environment Variables

**Backend (.env):**
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=optional
```

---

## 🎯 Admin Features

- Add/Edit/Delete movies
- Manage users
- View analytics
- Upload videos
- Manage subscriptions

---

## 📞 Support

Check the code or create an issue on GitHub!

---

**Your app is production-ready!** 🚀
