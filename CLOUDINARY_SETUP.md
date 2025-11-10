# ☁️ Cloudinary Setup Guide

Cloudinary provides permanent cloud storage for your videos, solving Railway's ephemeral storage issue.

## 🎯 Why Cloudinary?

- ✅ **Permanent storage** - Videos never deleted
- ✅ **Free tier** - 25GB storage, 25GB bandwidth/month
- ✅ **CDN delivery** - Fast video streaming worldwide
- ✅ **Automatic optimization** - Video compression and quality adjustment
- ✅ **No file size limits** on Railway

---

## 📋 Setup Steps

### Step 1: Create Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free account)
3. Verify your email

### Step 2: Get Your Credentials

1. Go to Dashboard: https://cloudinary.com/console
2. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 3: Add to Backend Environment Variables

**Local (.env file):**
```bash
# backend/.env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Railway:**
1. Go to Backend service → Variables
2. Add:
   ```
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   ```
3. Redeploy backend

### Step 4: Install Cloudinary Package

```bash
cd backend
npm install cloudinary
```

### Step 5: Update Admin Upload Form

The admin panel needs to use the new Cloudinary endpoint:
- Change upload URL from `/api/upload/video` to `/api/cloudinary/video`

---

## 🎬 How to Use

### Upload Video:
1. Go to Admin Panel → Upload tab
2. Fill in movie details
3. Select video file (up to 100MB for free tier)
4. Click "Upload Video"
5. Video uploads to Cloudinary
6. URL saved to database
7. Video accessible forever!

### Video URL Format:
```
https://res.cloudinary.com/your_cloud_name/video/upload/v1234567890/moviefy/videos/filename.mp4
```

---

## 💰 Free Tier Limits

**Cloudinary Free:**
- Storage: 25GB
- Bandwidth: 25GB/month
- Transformations: 25 credits/month
- Videos: Unlimited number

**Good for:**
- ~25 movies (1GB each)
- ~2,500 views/month (10MB per view)

---

## 🚀 Benefits

### Before (Railway Storage):
- ❌ Videos deleted on redeploy
- ❌ Limited storage
- ❌ No CDN
- ❌ Slow delivery

### After (Cloudinary):
- ✅ Permanent storage
- ✅ 25GB free storage
- ✅ Global CDN
- ✅ Fast streaming
- ✅ Automatic optimization
- ✅ Video thumbnails
- ✅ Quality adjustment

---

## 🔧 Advanced Features

### Video Transformations:
Cloudinary can automatically:
- Generate thumbnails
- Create multiple quality versions (360p, 720p, 1080p)
- Compress videos
- Convert formats

### Example:
```javascript
// Original video
https://res.cloudinary.com/.../video.mp4

// 720p version
https://res.cloudinary.com/.../w_1280,h_720,q_auto/video.mp4

// Thumbnail
https://res.cloudinary.com/.../video.jpg
```

---

## 📊 Monitoring

**Check usage:**
1. Go to Cloudinary Dashboard
2. View storage used
3. View bandwidth used
4. Upgrade if needed

---

## 🆙 Upgrade Options

If you exceed free tier:

**Cloudinary Plus ($99/month):**
- 100GB storage
- 100GB bandwidth
- More transformations

**Or use multiple accounts** (not recommended)

---

## ✅ Testing

After setup:
1. Upload a test video
2. Check Cloudinary dashboard - video should appear
3. Play video on your site
4. Redeploy Railway - video still works!

---

**Your videos are now permanently stored in the cloud!** 🎉
