# 🎬 Moviefy - Netflix Clone

A modern, feature-rich streaming platform built with React and Node.js.

## 📁 Project Structure

```
moviefy/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
│
├── backend/          # Node.js backend API
│   ├── routes/       # API routes
│   ├── models/       # Database models
│   ├── config/       # Configuration
│   └── package.json  # Backend dependencies
│
├── docs/             # Documentation files
│   ├── RUN_THIS.md              # Quick deployment guide
│   ├── GOOGLE_OAUTH_QUICK_FIX.md # Fix Google OAuth
│   └── WHICH_FILE_TO_USE.md     # Guide to documentation
│
├── scripts/          # Deployment and utility scripts
└── tests/            # Test files and tools
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Setup Environment

Create `.env` file in root:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Create `backend/.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Run Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

### 4. Access the App

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🎯 Features

- ✅ User authentication (Email, Phone, Google OAuth)
- ✅ Movie browsing and search
- ✅ Video streaming
- ✅ Watchlist management
- ✅ Subscription plans
- ✅ Admin dashboard
- ✅ Referral system
- ✅ Payment integration (Razorpay)
- ✅ Real-time database (MongoDB)

## 📚 Documentation

All documentation is in the `docs/` folder:

### Essential Guides:
- **[RUN_THIS.md](docs/RUN_THIS.md)** - Deploy to cloud (MongoDB Atlas, Railway, Vercel)
- **[GOOGLE_OAUTH_QUICK_FIX.md](docs/GOOGLE_OAUTH_QUICK_FIX.md)** - Fix Google OAuth errors
- **[WHICH_FILE_TO_USE.md](docs/WHICH_FILE_TO_USE.md)** - Guide to all documentation

### Quick Links:
- [Deployment Guide](docs/DEPLOY_WITH_GITHUB.md)
- [Database Setup](docs/HOW_TO_VIEW_DATABASE.md)
- [Google OAuth Setup](docs/SETUP_REAL_GOOGLE_OAUTH.md)

## 🔐 Demo Accounts

For testing without Google OAuth:

- **Admin:** admin@moviefy.com / admin123
- **User:** user@moviefy.com / user123

## 🛠️ Tech Stack

### Frontend:
- React 18
- React Router
- Vite
- CSS3

### Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

### Deployment:
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## 📱 Access from Anywhere

### Current Setup:
- **Local:** http://localhost:5173
- **Public URL:** See [YOUR_PUBLIC_URL.md](docs/YOUR_PUBLIC_URL.md)

### Deploy to Cloud:
Follow [RUN_THIS.md](docs/RUN_THIS.md) to deploy to:
- MongoDB Atlas (Database)
- Railway (Backend)
- Vercel (Frontend)

**Total time:** 20 minutes | **Cost:** FREE

## 🆘 Troubleshooting

### Google OAuth Not Working?
→ See [GOOGLE_OAUTH_QUICK_FIX.md](docs/GOOGLE_OAUTH_QUICK_FIX.md)

### Can't Access from Phone?
→ See [YOUR_PUBLIC_URL.md](docs/YOUR_PUBLIC_URL.md)

### Database Issues?
→ See [HOW_TO_VIEW_DATABASE.md](docs/HOW_TO_VIEW_DATABASE.md)

### Deployment Help?
→ See [RUN_THIS.md](docs/RUN_THIS.md)

## 📦 Scripts

### Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend:
```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
```

### Deployment:
```bash
# See scripts/ folder for automated deployment scripts
powershell -ExecutionPolicy Bypass -File scripts/deploy-all.ps1
```

## 🌟 Key Features Explained

### Authentication:
- Email/Password login
- Phone OTP login
- Google OAuth integration
- JWT-based sessions

### Video Streaming:
- Upload custom videos
- YouTube/Vimeo integration
- Continue watching feature
- Watchlist management

### Admin Features:
- User management
- Movie management
- Analytics dashboard
- Pricing control

### Payment:
- Razorpay integration
- Multiple subscription plans
- Referral rewards
- Trial periods

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- CORS protection
- Environment variables for secrets
- MongoDB injection prevention

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📞 Support

For issues or questions, check the documentation in the `docs/` folder.

---

**Made with ❤️ using React and Node.js**
