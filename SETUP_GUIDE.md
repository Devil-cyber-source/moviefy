# 🎬 Moviefy - Complete Setup Guide

## What You Just Got

A full-stack video streaming platform with:
- ✅ React frontend (already working)
- ✅ Node.js backend API (just created)
- ✅ MongoDB database integration
- ✅ Video upload system
- ✅ Authentication & authorization
- ✅ Cloud storage ready

## 🚀 Step-by-Step Setup

### Step 1: Install MongoDB

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB runs automatically as a service

**Or use MongoDB Atlas (Cloud - Free):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your settings
notepad .env
```

In `.env`, set:
```
MONGODB_URI=mongodb://localhost:27017/moviefy
JWT_SECRET=your_secret_key_change_this
```

### Step 3: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

### Step 4: Update Frontend to Use Backend

Create `src/config/api.js`:
```javascript
export const API_URL = 'http://localhost:5000/api';

export const api = {
  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  
  async getMovies() {
    const res = await fetch(`${API_URL}/movies`);
    return res.json();
  },
  
  async uploadVideo(formData, token) {
    const res = await fetch(`${API_URL}/upload/video`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return res.json();
  }
};
```

### Step 5: Test the System

1. **Start Backend:**
```bash
cd backend
npm run dev
```

2. **Start Frontend (new terminal):**
```bash
npm run dev
```

3. **Test API:**
Open browser: http://localhost:5000/api/health

Should show: `{"status":"ok","message":"Moviefy API is running"}`

## 🎥 How to Upload Videos

### Admin Panel Upload

1. Login as admin
2. Go to Admin Dashboard
3. Click "Add Movie"
4. Fill in details:
   - Title
   - Description
   - Category
   - Thumbnail URL
   - Upload video file

### Using Postman/API

```bash
POST http://localhost:5000/api/upload/video
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
Body (form-data):
  video: [select video file]
  title: "Movie Title"
  description: "Description"
  category: "Action"
  thumbnail: "https://image-url.jpg"
  year: 2024
```

## ☁️ Cloud Storage Setup (Production)

### Option A: AWS S3

1. Create AWS account
2. Create S3 bucket
3. Get access keys
4. Install SDK:
```bash
npm install @aws-sdk/client-s3
```

5. Add to `.env`:
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=moviefy-videos
```

### Option B: Cloudflare R2 (Cheaper)

1. Create Cloudflare account
2. Go to R2 Storage
3. Create bucket
4. Get API tokens
5. Add to `.env`:
```
CLOUDFLARE_ACCOUNT_ID=your_id
CLOUDFLARE_ACCESS_KEY_ID=your_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret
```

## 🎬 Video Processing (Optional)

For multiple quality options:

```bash
# Install FFmpeg
# Windows: Download from https://ffmpeg.org/download.html

# Install Node package
npm install fluent-ffmpeg
```

## 🌐 Deployment

### Backend Deployment

**Railway.app (Recommended):**
1. Go to https://railway.app
2. Connect GitHub
3. Deploy backend folder
4. Add MongoDB plugin
5. Set environment variables

**Render.com:**
1. Go to https://render.com
2. Create Web Service
3. Connect repository
4. Set build command: `cd backend && npm install`
5. Set start command: `npm start`

### Frontend Deployment

```bash
npm run build
```

Deploy `dist` folder to:
- Vercel
- Netlify
- Cloudflare Pages

## 📝 Important Notes

### File Size Limits
- Current limit: 5GB per video
- Adjust in `backend/routes/upload.js`

### Supported Formats
- MP4, MKV, AVI, MOV, WebM
- Recommended: MP4 (H.264)

### Storage Considerations
- Local: Limited by server disk
- Cloud: Pay per GB stored + bandwidth
- CDN: Recommended for better performance

### Legal Reminder
⚠️ Only upload content you own or have rights to distribute!

## 🔧 Troubleshooting

**MongoDB won't connect:**
- Check if MongoDB service is running
- Verify connection string in .env

**Upload fails:**
- Check file size limit
- Verify file format
- Check disk space

**CORS errors:**
- Backend CORS is configured
- Check API_URL in frontend

## 📚 Next Steps

1. ✅ Test local upload
2. ✅ Setup cloud storage
3. ✅ Add video processing
4. ✅ Deploy to production
5. ✅ Add CDN for streaming
6. ✅ Implement video analytics

## 🆘 Need Help?

Check the backend README.md for detailed API documentation.
