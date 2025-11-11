# 🎬 Video Playback Troubleshooting

## 🔍 Debug Steps

### 1. Check Browser Console

1. **Open Developer Tools** (F12 or Right-click → Inspect)
2. **Go to Console tab**
3. **Click on a movie**
4. **Look for these messages:**
   - `VideoPlayer - Movie:` (shows movie data)
   - `VideoPlayer - Video URL:` (shows video path)
   - Any red error messages

### 2. Common Issues & Solutions

#### Issue: Black Screen / Video Won't Load

**Possible Causes:**
- Video file doesn't exist
- Wrong video URL
- Backend not running
- CORS issues

**Solutions:**
1. Check if backend is running: `http://localhost:5000`
2. Verify video URL in console
3. Check if video file exists in `backend/uploads/videos/`

#### Issue: "Failed to load video"

**Solutions:**
1. **Check video format** - Supported: MP4, WebM, MKV
2. **Check file size** - Max 5GB
3. **Verify backend URL** in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

#### Issue: Video Player Doesn't Open

**Solutions:**
1. **Check if movie has videoUrl:**
   - Open console
   - Look for `VideoPlayer - Video URL:`
   - Should show a path like `/uploads/videos/filename.mp4`

2. **If videoUrl is missing:**
   - Movie wasn't uploaded properly
   - Delete and re-upload the movie

#### Issue: CORS Error

**Error in console:**
```
Access to video at 'http://localhost:5000/uploads/...' from origin 'http://localhost:5173' has been blocked by CORS
```

**Solution:**
Check `backend/server.js` has CORS enabled:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
```

---

## 🧪 Test Video Playback

### Method 1: Direct URL Test

1. **Get video URL from console**
2. **Open in new tab:** `http://localhost:5000/uploads/videos/filename.mp4`
3. **Should play directly**

If it doesn't play:
- Video file is missing
- Backend not serving files correctly

### Method 2: Check Upload

1. **Go to backend folder**
2. **Check:** `backend/uploads/videos/`
3. **Verify video file exists**

---

## 📊 Video URL Formats

Your app supports 3 types:

### 1. Uploaded Videos (Local)
```
/uploads/videos/1234567890-abc123.mp4
```
- Stored on your server
- Served by backend

### 2. YouTube Videos
```
youtube:VIDEO_ID
https://youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
```
- Embedded via iframe
- No storage needed

### 3. Vimeo Videos
```
vimeo:VIDEO_ID
https://vimeo.com/VIDEO_ID
```
- Embedded via iframe
- No storage needed

---

## 🔧 Quick Fixes

### Fix 1: Restart Backend
```bash
cd backend
npm start
```

### Fix 2: Clear Browser Cache
1. Press Ctrl+Shift+Delete
2. Clear cached images and files
3. Refresh page (Ctrl+F5)

### Fix 3: Check Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
```

**Backend** (`backend/.env`):
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Fix 4: Re-upload Video

If video is corrupted or missing:
1. Delete the movie from admin panel
2. Upload again via Upload tab
3. Test playback

---

## 📝 Debug Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 5173
- [ ] Video file exists in `backend/uploads/videos/`
- [ ] Browser console shows no errors
- [ ] Video URL is correct in database
- [ ] CORS is enabled in backend
- [ ] Environment variables are set

---

## 🆘 Still Not Working?

### Get Detailed Info:

1. **Open browser console (F12)**
2. **Click on a movie**
3. **Copy all console output**
4. **Check for:**
   - Video URL
   - Error messages
   - Network requests (Network tab)

### Check Network Tab:

1. **Open DevTools → Network tab**
2. **Click on a movie**
3. **Look for video request**
4. **Check status code:**
   - 200 = OK
   - 404 = File not found
   - 500 = Server error

---

## 💡 Tips

1. **Use MP4 format** - Best compatibility
2. **Keep files under 2GB** - Better performance
3. **Use Cloudinary** - For production (see CLOUDINARY_SETUP.md)
4. **Test locally first** - Before deploying

---

## 🎯 Expected Behavior

**When working correctly:**
1. Click on movie
2. Video player opens (full screen overlay)
3. Video starts playing automatically
4. Controls are visible
5. Can pause, seek, adjust volume
6. Close button (X) works

**If this doesn't happen, follow the troubleshooting steps above!**
