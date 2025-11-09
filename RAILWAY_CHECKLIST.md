# 🚨 Railway Deployment Checklist - Fix "Application failed to respond"

## ✅ Backend Service Setup

### 1. Root Directory
- Go to **Settings** → **Root Directory**
- Set to: `backend`
- Click **Save**

### 2. Environment Variables (CRITICAL!)
Go to **Variables** tab and add these:

```
MONGODB_URI = mongodb://mongo.railway.internal:27017/moviefy
JWT_SECRET = moviefy_secret_key_2024_change_in_production_12345
FRONTEND_URL = https://your-frontend-url.railway.app
NODE_ENV = production
```

**IMPORTANT:** 
- If you created a MongoDB database in Railway, use: `mongodb://mongo.railway.internal:27017/moviefy`
- OR use MongoDB Atlas connection string: `mongodb+srv://username:password@cluster.mongodb.net/moviefy`

### 3. Check Deploy Logs
- Click **Deployments** tab
- Click the latest deployment
- Look for errors in the logs
- Common errors:
  - ❌ "MONGODB_URI is not defined" → Add MONGODB_URI variable
  - ❌ "Connection refused" → MongoDB not running
  - ❌ "Module not found" → Wrong root directory

### 4. Redeploy
- After setting variables, click **Redeploy**
- Wait 2-3 minutes for deployment

---

## ✅ MongoDB Database Setup

### Option A: Railway MongoDB (Recommended)
1. Click **+ New** → **Database** → **Add MongoDB**
2. Wait for it to deploy
3. Click on MongoDB service → **Variables** tab
4. Copy the **MONGO_URL** value
5. Go to backend service → **Variables**
6. Set `MONGODB_URI` to the copied MONGO_URL

### Option B: MongoDB Atlas (Free)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to backend variables as `MONGODB_URI`

---

## ✅ Frontend Service Setup

### 1. Root Directory
- Go to **Settings** → **Root Directory**
- Set to: `frontend`
- Click **Save**

### 2. Environment Variables
Go to **Variables** tab and add:

```
VITE_API_URL = https://your-backend-url.railway.app
```

**Replace** `your-backend-url` with your actual backend domain!

### 3. Redeploy
- Click **Redeploy**
- Wait 3-5 minutes for build

---

## 🐛 Troubleshooting "Application failed to respond"

### Check Backend Logs:
1. Go to backend service
2. Click **Deployments** → Latest deployment
3. Look for error messages

### Common Issues:

#### 1. MongoDB Not Connected
**Error:** `MongooseServerSelectionError` or `ECONNREFUSED`

**Fix:**
- Make sure MongoDB service is running
- Check MONGODB_URI is correct
- If using Railway MongoDB: `mongodb://mongo.railway.internal:27017/moviefy`
- If using Atlas: Get new connection string

#### 2. Missing Environment Variables
**Error:** `JWT_SECRET is not defined`

**Fix:**
- Add all required variables in Variables tab
- Click Redeploy

#### 3. Wrong Root Directory
**Error:** `Cannot find module './server.js'`

**Fix:**
- Settings → Root Directory → Set to `backend`
- Redeploy

#### 4. Port Issues
**Error:** `EADDRINUSE` or port errors

**Fix:**
- Remove PORT from variables (Railway sets it automatically)
- Redeploy

---

## 📋 Quick Fix Steps

1. **Delete and recreate services:**
   - Delete both frontend and backend services
   - Start fresh with correct settings

2. **Backend Service:**
   ```
   Root Directory: backend
   Variables:
     MONGODB_URI = <your-mongodb-url>
     JWT_SECRET = moviefy_secret_key_2024
     FRONTEND_URL = *
   ```

3. **Frontend Service:**
   ```
   Root Directory: frontend
   Variables:
     VITE_API_URL = <your-backend-url>
   ```

4. **Deploy in order:**
   - First: MongoDB
   - Second: Backend (wait until healthy)
   - Third: Frontend

---

## 🆘 Still Not Working?

Share these with me:
1. Backend deploy logs (full output)
2. Screenshot of backend Variables tab
3. Screenshot of backend Settings (Root Directory)
4. MongoDB connection string (hide password)

I'll help you debug! 🚀
