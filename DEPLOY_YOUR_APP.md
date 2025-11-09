# 🚀 Deploy Your App - Complete Guide

## 🎯 Goal
Deploy your Moviefy app with database and backend so it's accessible from anywhere, anytime, on any device.

**Time:** 30 minutes  
**Cost:** $0 (FREE)  
**Result:** Live app with real database, accessible 24/7 from anywhere

---

## 📋 What You'll Deploy

```
1. MongoDB Atlas → Database (stores your data)
2. Render → Backend API (handles requests)
3. Vercel → Frontend (your website)
```

All are FREE and work together!

---

## 🚀 STEP 1: MongoDB Atlas (Database) - COMPLETED ✅

You've already completed this step!

**Your connection string:**
```
mongodb+srv://Moviefy:RCR9dwlV6WnD7MDH@moviefy.igohsfz.mongodb.net/moviefy?appName=Moviefy
```

---

## 🚀 STEP 2: Render (Backend) - 10 minutes

### 2.1 Create Account

🔗 **Go to:** https://render.com/

1. Click **"Get Started"** or **"Sign Up"**
2. Click **"GitHub"** button
3. Click **"Authorize Render"**
4. ✅ You're logged in!

### 2.2 Create New Web Service

1. Click **"New +"** button (top right)
2. Choose **"Web Service"**
3. Find and select **"moviefy"** repository
4. Click **"Connect"**

### 2.3 Configure Service

Fill in these fields:

**Name:**
```
moviefy-backend
```

**Root Directory:**
```
backend
```

**Environment:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:**
```
Free (select the free tier)
```

### 2.4 Add Environment Variables

Scroll down to **"Environment Variables"** section and add these:

**Variable 1:**
- Key: `PORT`
- Value: `10000`

**Variable 2:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://Moviefy:RCR9dwlV6WnD7MDH@moviefy.igohsfz.mongodb.net/moviefy?appName=Moviefy`

**Variable 3:**
- Key: `JWT_SECRET`
- Value: `moviefy_secret_key_2024_change_in_production_12345`

**Variable 4:**
- Key: `FRONTEND_URL`
- Value: `http://localhost:5173`

(We'll update this after deploying frontend)

### 2.5 Deploy

1. Click **"Create Web Service"** at the bottom
2. Render will start building (3-5 minutes)
3. Wait for "Live" status with green dot

### 2.6 Get Your Backend URL

Once deployed:
- You'll see a URL at the top like: `https://moviefy-backend.onrender.com`
- **Copy and save this URL!**

**✅ Render Backend Complete!**

---

## 🚀 STEP 3: Vercel (Frontend) - 10 minutes

### 3.1 Create Account

🔗 **Go to:** https://vercel.com/signup

1. Click **"Continue with GitHub"**
2. Click **"Authorize Vercel"**
3. ✅ You're logged in!

### 3.2 Import Project

1. Click **"Add New..."** (top right)
2. Click **"Project"**
3. Find **"moviefy"**
4. Click **"Import"**

### 3.3 Configure Project

**Root Directory (IMPORTANT!):**
1. Click **"Edit"** next to Root Directory
2. Select **"frontend"**
3. Click **"Continue"**

**Framework:**
- Should auto-detect as **"Vite"**

**Build Settings (auto-filled):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.4 Add Environment Variables

Add these variables:

**Variable 1:**
- Name: `VITE_API_URL`
- Value: `https://your-render-url.onrender.com/api`
(Replace with your Render URL from Step 2.6)

**Variable 2:**
- Name: `VITE_GOOGLE_CLIENT_ID`
- Value: `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com`

### 3.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get: `https://moviefy-abc123.vercel.app`

**✅ Vercel Frontend Complete!**

---

## 🚀 STEP 4: Connect Everything - 5 minutes

### 4.1 Update Render Backend

1. Go back to Render dashboard
2. Click on your backend service
3. Click **"Environment"** in left sidebar
4. Find **"FRONTEND_URL"**
5. Update to your Vercel URL
6. Click **"Save Changes"**
7. Service will redeploy automatically

**✅ Everything Connected!**

---

## 🎉 YOU'RE LIVE!

### Your Live URLs:

**Main App:**
```
https://moviefy-abc123.vercel.app
```

**Backend API:**
```
https://moviefy-backend.onrender.com
```

**Database:**
```
MongoDB Atlas (cloud)
```

---

## 📱 Test Your App

1. Open your Vercel URL
2. Create account or login
3. Browse movies
4. Test on phone
5. Share with friends!

---

## 💰 Cost

**Everything is FREE!**
- MongoDB Atlas: FREE (512MB)
- Render: FREE (750 hours/month)
- Vercel: FREE (100GB bandwidth)

**Total: $0/month** ✅

---

## 🔄 Future Updates

```bash
git add .
git commit -m "Your changes"
git push
```

Render and Vercel auto-deploy! ✅

---

**Congratulations! Your app is live!** 🎉
