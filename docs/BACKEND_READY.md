# ✅ Backend is Running!

## 🎉 Your video streaming backend is LIVE!

### Server Status
- ✅ Backend API: http://localhost:5000
- ✅ Database: JSON file (no MongoDB needed)
- ✅ Admin account created
- ✅ Upload system ready

---

## 🚀 Quick Start - Upload Your First Video

### Option 1: Use the Upload Page (Easiest)

1. Open in browser: **http://localhost:5000/public/upload.html**

2. Login with:
   - Email: `admin@moviefy.com`
   - Password: `admin123`

3. Fill in movie details and upload video!

### Option 2: Use Postman/API

```bash
POST http://localhost:5000/api/upload/video
Headers:
  Authorization: Bearer YOUR_TOKEN
Body (form-data):
  video: [select file]
  title: "Movie Title"
  description: "Description"
  category: "Action"
  thumbnail: "https://image-url.jpg"
  year: 2024
```

---

## 📡 API Endpoints

### Test API Health
```
GET http://localhost:5000/api/health
```

### Authentication
```
POST http://localhost:5000/api/auth/login
Body: { "email": "admin@moviefy.com", "password": "admin123" }
```

### Get Movies
```
GET http://localhost:5000/api/movies
GET http://localhost:5000/api/movies?category=Action
GET http://localhost:5000/api/movies?search=title
```

### Upload Video (Admin only)
```
POST http://localhost:5000/api/upload/video
Headers: Authorization: Bearer TOKEN
Body: form-data with video file + details
```

---

## 📁 File Structure

```
backend/
├── server.js          # Main server
├── db.js             # Database (JSON file)
├── db.json           # Data storage
├── routes/           # API routes
│   ├── auth.js       # Login/Register
│   ├── movies.js     # Movie CRUD
│   ├── upload.js     # Video upload
│   └── users.js      # User management
├── middleware/       # Auth middleware
├── uploads/          # Uploaded videos stored here
└── public/           # Upload page
```

---

## 🎬 How Video Upload Works

1. **Admin logs in** → Gets JWT token
2. **Selects video file** → Max 5GB
3. **Fills movie details** → Title, description, category, etc.
4. **Uploads** → File saved to `backend/uploads/videos/`
5. **Database updated** → Movie info saved to `db.json`
6. **Video accessible** → At `http://localhost:5000/uploads/videos/filename.mp4`

---

## 🔐 Default Admin Account

- **Email:** admin@moviefy.com
- **Password:** admin123
- **Role:** admin
- **Referral Code:** ADMIN001

---

## 💡 Next Steps

### 1. Test Upload
- Go to http://localhost:5000/public/upload.html
- Login and upload a test video

### 2. Connect Frontend
Update your React app to use the backend:

```javascript
// src/config/api.js
export const API_URL = 'http://localhost:5000/api';

// Login example
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token, user } = await response.json();

// Get movies
const movies = await fetch(`${API_URL}/movies`).then(r => r.json());
```

### 3. Deploy to Production
When ready, deploy to:
- Railway.app (easiest)
- Render.com
- DigitalOcean
- AWS/Azure

---

## 🛠️ Troubleshooting

**Can't access upload page?**
- Make sure backend is running: `cd backend && npm start`
- Check http://localhost:5000/api/health

**Upload fails?**
- Check file size (max 5GB)
- Verify file format (MP4, MKV, AVI, MOV, WebM)
- Make sure you're logged in as admin

**Need to restart server?**
```bash
cd backend
npm start
```

---

## 📊 Database Location

All data stored in: `backend/db.json`

You can view/edit this file directly to see:
- Users
- Movies
- Categories

---

## ☁️ Upgrade to Cloud Storage (Optional)

For production, use cloud storage:

1. **AWS S3** - Most popular
2. **Cloudflare R2** - Cheaper alternative
3. **Google Cloud Storage**
4. **Azure Blob Storage**

See `SETUP_GUIDE.md` for cloud setup instructions.

---

## 🎯 What You Can Do Now

✅ Upload videos via web interface
✅ Store videos locally
✅ Manage movies via API
✅ User authentication
✅ Admin controls
✅ Ready to connect to React frontend

---

**Backend is running at:** http://localhost:5000
**Upload page:** http://localhost:5000/public/upload.html

Happy streaming! 🎬
