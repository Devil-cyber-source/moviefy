# 🎬 Moviefy - Netflix Clone

A modern, feature-rich streaming platform built with React, Node.js, and MongoDB.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### 2. Run Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Access the App
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Network:** http://172.16.2.39:5173 (from any device on same WiFi)

---

## 🎯 Features

### User Features
- ✅ Multiple login methods (Email, Phone OTP, Google)
- ✅ Browse and search movies
- ✅ Video streaming
- ✅ My List / Watchlist
- ✅ Continue watching
- ✅ Subscription plans
- ✅ Referral system
- ✅ Watch party

### Admin Features
- ✅ Add/Edit/Delete movies
- ✅ User management
- ✅ Analytics dashboard
- ✅ Video upload
- ✅ Subscription management

### Technical Features
- ✅ Lazy loading images
- ✅ Mobile responsive
- ✅ Error boundaries
- ✅ Performance optimized
- ✅ Real-time database
- ✅ JWT authentication

---

## 🔐 Demo Accounts

**Admin:**
- Email: `admin@moviefy.com`
- Password: `admin123`

**User:**
- Email: `user@moviefy.com`
- Password: `user123`

**Google Login:**
- Click "Continue with Google" (instant demo mode)

**Phone Login:**
- Enter any phone number
- OTP: `123456`

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- React Router
- CSS3

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication

**Features:**
- Google OAuth
- Razorpay Payment
- Video Streaming
- Real-time Updates

---

## 📱 Access from Anywhere

### Local Network (Same WiFi)
```
http://172.16.2.39:5173
```
Access from phone, tablet, or any device on same WiFi!

### Internet Access (Ngrok)
```bash
ngrok http 5173
```
Share the HTTPS URL with anyone!

### Permanent Deployment
See `COMPLETE_GUIDE.md` for deploying to:
- Render (Free)
- Vercel (Free)
- Railway (Free)

---

## 📁 Project Structure

```
moviefy/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── services/    # API services
│   │   └── data/        # Static data
│   └── package.json
│
├── backend/           # Node.js API
│   ├── routes/        # API routes
│   ├── models/        # MongoDB models
│   ├── config/        # Configuration
│   └── package.json
│
├── COMPLETE_GUIDE.md  # Full documentation
└── README.md          # This file
```

---

## 🔧 Environment Variables

**Backend (.env):**
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=optional
```

---

## 📦 Available Scripts

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
```

**Backend:**
```bash
npm start        # Start server
npm run dev      # Development mode
```

---

## 🎨 Key Features Explained

### Authentication
- Email/Password with validation
- Phone OTP (demo mode)
- Google OAuth (instant demo)
- JWT sessions
- Password change

### Video Management
- Upload custom videos
- YouTube/Vimeo integration
- Continue watching
- Watch history
- My List

### Subscriptions
- Multiple plans (Basic, Standard, Premium)
- Razorpay integration
- Trial periods
- Auto-renewal
- Referral rewards

### Admin Panel
- User analytics
- Movie management
- Upload videos
- Pricing control
- Database viewer

---

## 🚀 Deployment

### Quick Deploy (20 minutes)

1. **MongoDB Atlas** (Database)
   - Create free cluster
   - Get connection string

2. **Render** (Backend)
   - Deploy from GitHub
   - Add environment variables

3. **Vercel** (Frontend)
   - Deploy from GitHub
   - Add API URL

**See `COMPLETE_GUIDE.md` for detailed steps!**

---

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Environment variables
- ✅ Input validation
- ✅ MongoDB injection prevention

---

## 📱 Mobile Support

- ✅ Fully responsive design
- ✅ Touch-friendly interface
- ✅ Mobile navigation
- ✅ Optimized performance
- ✅ Network access enabled

---

## 🆘 Troubleshooting

**Can't access from phone?**
- Make sure on same WiFi
- Use: `http://172.16.2.39:5173`

**Google login not working?**
- It's in demo mode (works instantly)
- No configuration needed

**Database connection failed?**
- Check MongoDB URI in `.env`
- Make sure MongoDB is running

**Port already in use?**
- Change PORT in backend `.env`
- Update VITE_API_URL in frontend

---

## 📄 License

This project is for educational purposes.

---

## 🤝 Contributing

Feel free to fork and customize!

---

**Made with ❤️ using React, Node.js, and MongoDB**

**For detailed documentation, see `COMPLETE_GUIDE.md`**
