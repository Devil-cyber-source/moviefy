# 📤 Upload Troubleshooting Guide

## ✅ Fixed Issues:
1. **Added Upload Tab** - You can now access the upload form via the "📤 Upload" tab in admin panel
2. **Correct Field Mapping** - Form sends `thumbnail` field (not `poster`) to match backend expectations

## 🔍 How to Upload Movies:

### Step 1: Access Upload Tab
1. Go to Admin Panel
2. Click on **"📤 Upload"** tab (newly added)
3. You'll see the upload form

### Step 2: Fill Required Fields
- **Movie Title** (required)
- **Year** (required)
- **Category** (dropdown - action, drama, comedy, etc.)
- **Description** (required)
- **Thumbnail URL** (required - poster image URL)
- **Video File** (required - click to select from your computer)

### Step 3: Upload
1. Click "📤 Upload Video" button
2. Wait for progress bar to reach 100%
3. You'll see "✅ Video uploaded successfully!" message
4. Movie will appear in the Movies tab

---

## 🐛 If Upload Still Doesn't Work:

### Check 1: Backend Server Running
```bash
cd backend
npm start
```
Should see: `🚀 Server running on http://localhost:5000`

### Check 2: Database Connected
Look for: `✅ MongoDB Connected` in backend console

### Check 3: Authentication Token
- Make sure you're logged in as admin
- Token is stored in localStorage
- Check browser console for auth errors

### Check 4: File Size
- Maximum: 5GB
- Supported formats: MP4, MKV, AVI, MOV, WebM

### Check 5: CORS Issues
Backend should have CORS enabled for frontend URL:
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
```

### Check 6: Upload Directory Exists
Backend creates this automatically, but verify:
```
backend/uploads/videos/
```

---

## 🔍 Debug Steps:

### 1. Check Browser Console
Open DevTools (F12) → Console tab
Look for errors during upload

### 2. Check Network Tab
DevTools → Network tab
- Look for `/api/upload/video` request
- Check status code (should be 200)
- Check response body for errors

### 3. Check Backend Console
Look for:
- Upload request received
- File saved successfully
- Database save successful

### 4. Verify Movie in Database
After upload, check Movies tab in admin panel
- Should see newly uploaded movie
- Check if it has correct fields

---

## 📊 Expected Flow:

1. **Frontend** → Sends FormData with video file + metadata
2. **Backend** → Receives at `/api/upload/video`
3. **Multer** → Saves file to `backend/uploads/videos/`
4. **MongoDB** → Saves movie document with:
   - title
   - description
   - thumbnail
   - videoUrl (path to uploaded file)
   - category
   - year
   - status: 'ready'
5. **Frontend** → Reloads movies list
6. **Movie appears** in Movies tab and Home page

---

## 🎯 Common Issues & Solutions:

### Issue: "No video file uploaded"
**Solution:** Make sure you selected a video file before clicking upload

### Issue: "Upload failed: Network error"
**Solution:** 
- Check if backend is running
- Verify VITE_API_URL in frontend/.env
- Check CORS settings

### Issue: "Upload failed: Only video files are allowed"
**Solution:** Use supported formats: MP4, MKV, AVI, MOV, WebM

### Issue: "Upload successful but movie doesn't appear"
**Solution:**
- Refresh the page
- Check Movies tab
- Verify database connection
- Check if movie status is 'ready'

### Issue: "401 Unauthorized"
**Solution:**
- Log out and log back in
- Make sure you're logged in as admin
- Check if token is valid

---

## 🔧 Manual Database Check:

If you want to verify movies in database directly:

```bash
# Connect to MongoDB
mongosh

# Use your database
use moviefy

# Check movies
db.movies.find().pretty()

# Check latest movie
db.movies.find().sort({createdAt: -1}).limit(1).pretty()
```

---

## ✅ Success Indicators:

When upload works correctly, you should see:

1. **Progress bar** reaches 100%
2. **Success message**: "✅ Video uploaded successfully!"
3. **Form resets** automatically
4. **Movie appears** in Movies tab
5. **Backend console** shows: "Video uploaded successfully"
6. **File exists** in `backend/uploads/videos/`

---

## 🚀 Next Steps After Upload:

1. Go to **Movies** tab to verify upload
2. Click **Edit** to add more details (duration, rating, backdrop)
3. Go to **Home** page to see movie in grid
4. Click movie to play and test video playback

---

## 📝 Notes:

- Videos are stored locally on your server (not in database)
- Database only stores metadata and file path
- For production, consider using Cloudinary or AWS S3
- Current setup is perfect for development/testing
