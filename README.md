# 🎬 MOVIEFY - Streaming Platform

A modern, full-stack streaming platform built with React, Node.js, Express, and MongoDB.

---

## ✨ Features

- 🎬 **Upload & Stream Movies** - Upload videos and stream them
- 👥 **User Management** - Admin and user roles
- 🔐 **Authentication** - Secure login/signup
- 📊 **Admin Dashboard** - Manage movies, users, analytics
- 🎨 **Modern UI** - Netflix-style dark theme
- 📱 **Responsive** - Works on all devices
- 🗑️ **Movie Management** - Edit, delete movies
- 📈 **Analytics** - View platform statistics

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/moviefy.git
cd moviefy
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Set up environment variables**

**Backend** (`backend/.env`):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

4. **Run the application**

```bash
# Backend (in backend folder)
npm start

# Frontend (in frontend folder)
npm run dev
```

5. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 👤 Default Accounts

**Admin:**
- Email: `admin@moviefy.com`
- Password: `admin123`

**User:**
- Email: `user@moviefy.com`
- Password: `user123`

---

## 📦 Deployment

### Deploy to Railway

**Backend:**
1. Go to [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory to `backend`
5. Add environment variables (see BACKEND_RAILWAY_DEPLOY.md)

**Frontend:**
1. New Project → Deploy from GitHub
2. Select your repo
3. Set root directory to `frontend`
4. Add `VITE_API_URL` with your backend URL

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **BACKEND_RAILWAY_DEPLOY.md** - Backend deployment on Railway
- **CLOUDINARY_SETUP.md** - Video storage with Cloudinary
- **VIDEO_STORAGE_COMPARISON.md** - Storage options comparison

---

## 🎯 Usage

### Admin Panel

1. Login as admin
2. Go to **Upload** tab
3. Fill in movie details
4. Select video file
5. Click Upload

### Managing Movies

- **Edit**: Click Edit button on any movie
- **Delete**: Click Delete button (permanent)
- **Multi Delete**: Use Multi Delete mode

### User Side

- Browse movies
- Click to play
- Continue watching from where you left off

---

## 🗑️ Clear Database

To start fresh and delete all movies:

```bash
cd backend
node scripts/clearMovies.js
```

Or via MongoDB shell:
```bash
mongosh
use moviefy
db.movies.deleteMany({})
```

---

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)

**Deployment:**
- Railway (hosting)
- MongoDB Atlas (database)
- Cloudinary (optional video storage)

---

## 📁 Project Structure

```
moviefy/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, rate limiting
│   ├── config/          # Database config
│   ├── uploads/         # Uploaded videos
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── utils/       # Utilities
│   │   └── styles/      # CSS files
│   └── public/          # Static files
└── README.md
```

---

## 🔧 Configuration

### Video Storage

**Local Storage (Default):**
- Videos stored in `backend/uploads/videos/`
- Good for development
- Limited by server storage

**Cloudinary (Recommended for Production):**
- Unlimited storage
- CDN delivery
- See `CLOUDINARY_SETUP.md`

### Environment Variables

**Required:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

**Optional:**
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

---

## 🐛 Troubleshooting

### Movies not showing
- Check if backend is running
- Verify MongoDB connection
- Check browser console for errors

### Upload fails
- Check file size (max 5GB)
- Verify backend is running
- Check supported formats: MP4, MKV, AVI, MOV, WebM

### Delete not working
- Make sure you're logged in as admin
- Check browser console for errors
- Verify backend connection

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Netflix for design inspiration
- Public domain movies for testing
- Open source community

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation files
- Review troubleshooting section

---

**Built with ❤️ by Your Team**

🎬 Happy Streaming!
