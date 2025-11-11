# 🚀 Fix Videos on Railway

## ⚠️ The Problem

**Railway has EPHEMERAL storage** - uploaded videos are **DELETED** when:
- Service restarts
- New deployment happens
- Server updates

That's why your videos don't play after deployment!

---

## ✅ Solution: Use Cloudinary

Cloudinary stores videos permanently in the cloud.

### Step 1: Sign Up for Cloudinary (FREE)

1. Go to https://cloudinary.com
2. Click "Sign Up" (free account)
3. After signup, go to Dashboard
4. Copy these 3 values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

### Step 2: Add to Railway Backend

1. Go to Railway.app
2. Open your **backend** service
3. Go to **Variables** tab
4. Add these 3 variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

5. Click **Save**
6. Backend will auto-redeploy

---

### Step 3: Change Upload Endpoint

Your backend already supports Cloudinary! Just need to change the upload URL.

**Option A: Use Cloudinary Upload (Recommended)**

In `frontend/src/pages/Admin.jsx`, find line ~924:
```javascript
xhr.open('POST', `${apiUrl}/api/upload/video`)
```

Change to:
```javascript
xhr.open('POST', `${apiUrl}/api/cloudinary/video`)
```

**Option B: Keep Local Upload (Not Recommended for Railway)**

Keep as is, but videos will be deleted on restart.

---

### Step 4: Re-upload Your Movies

1. **Delete old movies** (they won't work anyway)
2. **Upload new movies** via Upload tab
3. **Videos now stored on Cloudinary** ✅
4. **Will work permanently** ✅

---

## 🎯 Quick Summary

**Before (Railway Local Storage):**
- ❌ Videos deleted on restart
- ❌ Not permanent
- ❌ Won't work in production

**After (Cloudinary):**
- ✅ Videos stored permanently
- ✅ Fast CDN delivery
- ✅ Works in production
- ✅ Free tier: 25GB storage

---

## 📊 Cloudinary Free Tier

- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** Yes
- **CDN:** Global
- **Cost:** FREE

Perfect for testing and small apps!

---

## 🔧 Alternative: Use Different Storage

If you don't want Cloudinary, see `VIDEO_STORAGE_COMPARISON.md` for other options:
- Bunny.net ($60/month for 100 movies)
- Backblaze B2 ($25/month for 100 movies)
- AWS S3 (pay as you go)

---

## 🆘 Still Having Issues?

### Check Cloudinary Setup:

1. **Verify credentials** in Railway Variables
2. **Check backend logs** for Cloudinary errors
3. **Test upload** - should see "Cloudinary" in logs

### Test Cloudinary:

After uploading, check video URL in database:
- Should start with: `https://res.cloudinary.com/...`
- NOT: `/uploads/videos/...`

---

## 💡 Why This Happens

**Railway (and most cloud platforms) use ephemeral storage:**
- Containers are temporary
- Files are deleted on restart
- Only code persists (from Git)

**Solution:**
- Use external storage (Cloudinary, S3, etc.)
- Store videos in the cloud
- Database stores URLs only

---

## ✅ After Setup

Your videos will:
- ✅ Play on Railway
- ✅ Survive restarts
- ✅ Load fast (CDN)
- ✅ Work permanently

**Follow the steps above and your videos will work!** 🎬✨
