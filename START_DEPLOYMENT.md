# 🚀 Start Deployment - Quick Guide

## 🎯 Goal
Get your app online in 20 minutes!

---

## 📋 What You Need

1. **MongoDB Atlas** - Database (Free)
2. **Railway** - Backend hosting (Free)
3. **Vercel** - Frontend hosting (Free)

**Total Cost: $0** ✅

---

## 🏃 Quick Start

### Step 1: MongoDB (5 min)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google
3. Create free cluster (M0)
4. Create user: `moviefy` / generate password
5. Allow all IPs (0.0.0.0/0)
6. Get connection string
7. **Save it!**

### Step 2: Railway (7 min)
1. Go to: https://railway.app/
2. Sign in with GitHub
3. New Project → Empty Service
4. Add environment variables (see below)
5. Deploy backend folder
6. Generate domain
7. **Save URL!**

**Environment Variables for Railway:**
```
PORT=5000
MONGODB_URI=mongodb+srv://moviefy:PASSWORD@cluster.mongodb.net/moviefy
JWT_SECRET=moviefy_secret_key_change_in_production
FRONTEND_URL=http://localhost:5173
```

### Step 3: Vercel (8 min)
1. Go to: https://vercel.com/
2. Sign up with GitHub
3. Install Vercel CLI: `npm install -g vercel`
4. Run: `vercel`
5. Follow prompts
6. Add environment variables (see below)
7. **Save URL!**

**Environment Variables for Vercel:**
```
VITE_API_URL=https://your-railway-url.up.railway.app/api
VITE_GOOGLE_CLIENT_ID=652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

### Step 4: Connect (2 min)
1. Update Railway FRONTEND_URL with your Vercel URL
2. Redeploy
3. Test!

---

## 🎉 Done!

Your app is now live at: `https://your-app.vercel.app`

Test it:
- ✅ Open on computer
- ✅ Open on phone
- ✅ Share with friends

---

## 📚 Detailed Guides

If you need more help:
- **Full Guide:** `DEPLOY_NOW_SIMPLE.md`
- **Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Original Guide:** `DEPLOY_EVERYWHERE_ACCESS.md`

---

## 🆘 Stuck?

Tell me:
1. Which step you're on
2. What error you see
3. I'll help you fix it!

---

**Let's get your app online!** 🚀
