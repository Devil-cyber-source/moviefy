# 🚀 Deploy Backend to Railway

## Step 1: Prepare Backend for Deployment

### 1.1 Check package.json
Your backend `package.json` should have:
```json
{
  "name": "moviefy-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 1.2 Verify server.js
Make sure your server listens on `0.0.0.0`:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

## Step 2: Deploy to Railway

### 2.1 Go to Railway
1. Visit https://railway.app
2. Sign in with GitHub
3. Click **"New Project"**

### 2.2 Deploy from GitHub
1. Select **"Deploy from GitHub repo"**
2. Choose your repository: `moviefy`
3. Railway will detect your project

### 2.3 Configure Root Directory
1. Click on your service
2. Go to **Settings**
3. Find **"Root Directory"**
4. Set it to: `backend`
5. Click **Save**

---

## Step 3: Add Environment Variables

Click on **Variables** tab and add:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (will update after frontend deploys)
FRONTEND_URL=https://your-frontend.up.railway.app

# Port (Railway provides this automatically)
PORT=5000

# Node Environment
NODE_ENV=production
```

### Get MongoDB URI:
1. Go to MongoDB Atlas (mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace `<password>` with your password
5. Add `/moviefy` at the end

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
```

---

## Step 4: Deploy

1. Railway will automatically deploy
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://your-backend.up.railway.app`

---

## Step 5: Update Frontend to Use Railway Backend

### 5.1 Update frontend/.env
```env
VITE_API_URL=https://your-backend.up.railway.app
```

### 5.2 Redeploy Frontend
```bash
git add .
git commit -m "Update backend URL to Railway"
git push
```

Railway will auto-deploy your frontend with new backend URL.

---

## Step 6: Test Everything

### 6.1 Test Backend
Visit: `https://your-backend.up.railway.app/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 6.2 Test Upload
1. Go to your frontend
2. Login as admin
3. Go to Upload tab
4. Upload a video
5. Should work!

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
- Check MONGODB_URI in Railway variables
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify database user has read/write permissions

### Issue 2: "CORS Error"
**Solution:**
- Add FRONTEND_URL to Railway variables
- Make sure it matches your frontend URL exactly
- Restart backend service

### Issue 3: "Upload fails"
**Solution:**
- Check if backend has write permissions
- Verify JWT_SECRET is set
- Check Railway logs for errors

### Issue 4: "502 Bad Gateway"
**Solution:**
- Check Railway logs
- Make sure server listens on `0.0.0.0`
- Verify PORT environment variable

---

## Railway CLI (Optional)

### Install Railway CLI
```bash
npm install -g @railway/cli
```

### Login
```bash
railway login
```

### Link Project
```bash
cd backend
railway link
```

### View Logs
```bash
railway logs
```

### Deploy Manually
```bash
railway up
```

---

## File Storage on Railway

### Important Notes:
1. **Railway has ephemeral storage** - uploaded files may be lost on restart
2. **For production, use Cloudinary** (see CLOUDINARY_SETUP.md)
3. **Temporary solution**: Files work until service restarts

### Recommended: Use Cloudinary
```env
# Add to Railway variables
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then use the Cloudinary upload endpoint instead:
`/api/cloudinary/video`

---

## Monitoring

### View Logs
1. Go to Railway dashboard
2. Click your backend service
3. Click **"Logs"** tab
4. See real-time logs

### Check Metrics
1. Click **"Metrics"** tab
2. See CPU, Memory, Network usage

### Set Up Alerts
1. Click **"Settings"**
2. Add notification webhooks
3. Get alerts for crashes

---

## Scaling (If Needed)

### Upgrade Plan
1. Free tier: 500 hours/month
2. Hobby: $5/month unlimited
3. Pro: $20/month with more resources

### Vertical Scaling
Railway automatically scales based on usage

---

## Environment Variables Reference

```env
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend.up.railway.app

# Optional
PORT=5000
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Quick Checklist

- [ ] Backend deployed to Railway
- [ ] MongoDB connected
- [ ] Environment variables set
- [ ] Backend URL copied
- [ ] Frontend .env updated with backend URL
- [ ] Frontend redeployed
- [ ] Upload tested and working
- [ ] Movies appear in frontend

---

## Your URLs

After deployment, save these:

```
Backend: https://your-backend.up.railway.app
Frontend: https://your-frontend.up.railway.app
MongoDB: mongodb+srv://...
```

---

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Update frontend with backend URL
3. ✅ Test upload functionality
4. 🎯 Set up Cloudinary for permanent storage
5. 🎯 Add custom domain (optional)

**Your backend will now be live on Railway!** 🚀
