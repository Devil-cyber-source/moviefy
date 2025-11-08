# 🎬 How to Upload Videos - Complete Guide

## ✅ You Now Have TWO Ways to Upload Videos!

### Method 1: Inside Your Main App (Recommended)
**Best for:** Regular admin use, integrated experience

1. Go to your main app: **http://localhost:5173**
2. Login as admin:
   - Email: `admin@moviefy.com`
   - Password: `admin123`
3. Click **"Admin Dashboard"** in the menu
4. Click the **"📤 Upload Video"** tab
5. Fill in movie details and select video file
6. Click "Upload Video" and watch the progress!

### Method 2: Standalone Upload Page
**Best for:** Quick uploads, testing, sharing with others

1. Go to: **http://localhost:5000/public/upload.html**
2. Login with admin credentials
3. Upload videos directly

---

## 📋 Step-by-Step Upload Process

### 1. Prepare Your Video
- **Format:** MP4, MKV, AVI, MOV, or WebM
- **Size:** Up to 5GB
- **Quality:** Any resolution (720p, 1080p, 4K)

### 2. Prepare Movie Information
You'll need:
- **Title** - Movie name
- **Year** - Release year
- **Category** - Action, Drama, Comedy, etc.
- **Description** - Brief summary
- **Thumbnail URL** - Poster image (use any image hosting)

### 3. Upload Process
1. Login to admin panel
2. Go to "Upload Video" tab
3. Fill in all movie details
4. Click "Select video file" and choose your video
5. Click "Upload Video"
6. Wait for upload to complete (progress bar shows status)
7. Done! Video is now available in your app

---

## 🎯 Where Videos Are Stored

**Local Storage:**
- Videos save to: `backend/uploads/videos/`
- Database saves to: `backend/db.json`
- Accessible at: `http://localhost:5000/uploads/videos/filename.mp4`

**In Your App:**
- Videos appear in the movies list automatically
- Users can browse and watch them
- Admins can edit/delete from Movies tab

---

## 🔧 Troubleshooting

### Upload Fails?
✅ **Check backend is running:**
```bash
cd backend
npm start
```

✅ **Verify you're logged in as admin**
- Email: admin@moviefy.com
- Password: admin123

✅ **Check file size** (must be under 5GB)

✅ **Check file format** (MP4, MKV, AVI, MOV, WebM)

### Can't See Uploaded Videos?
- Refresh the page
- Check the Movies tab in admin panel
- Verify upload completed successfully

### Backend Not Running?
```bash
cd backend
npm start
```
Should see: "✅ Database ready" and "🚀 Server running"

---

## 🌐 Using External Video URLs

Don't want to upload large files? You can also:

1. Go to **Movies** tab in admin
2. Click **"+ Add New Movie"**
3. Fill in details
4. For **Video URL**, paste any video link:
   - YouTube embed URL
   - Vimeo URL
   - Any direct video URL
   - Cloud storage URL (S3, Cloudflare R2, etc.)

---

## 📊 Admin Features

### Upload Video Tab
- Upload actual video files
- Progress tracking
- File size display
- Instant feedback

### Movies Tab
- View all movies
- Edit movie details
- Delete movies
- Bulk delete
- Add movies with URLs

### Users Tab
- View all users
- Check subscriptions
- See referrals

### Analytics Tab
- User growth
- Popular categories
- Revenue insights

---

## 🚀 Production Tips

### For Real Deployment:

1. **Use Cloud Storage**
   - AWS S3
   - Cloudflare R2 (cheaper)
   - Google Cloud Storage
   - Azure Blob Storage

2. **Add CDN**
   - CloudFlare
   - AWS CloudFront
   - For faster video delivery

3. **Video Processing**
   - Convert to multiple qualities (360p, 720p, 1080p)
   - Use FFmpeg
   - Generate thumbnails automatically

4. **Security**
   - Add file scanning
   - Implement rate limiting
   - Use signed URLs for videos

---

## 📱 Current Setup

**Frontend:** http://localhost:5173
- Your React app with admin panel
- Upload videos from "Upload Video" tab

**Backend:** http://localhost:5000
- API server handling uploads
- Stores videos locally

**Standalone Upload:** http://localhost:5000/public/upload.html
- Alternative upload interface

---

## 🎉 Quick Test

1. Open http://localhost:5173
2. Login as admin (admin@moviefy.com / admin123)
3. Go to Admin Dashboard
4. Click "Upload Video" tab
5. Try uploading a small test video!

---

**Both servers are running in the background!**
- Frontend: Port 5173
- Backend: Port 5000

Happy uploading! 🎬
