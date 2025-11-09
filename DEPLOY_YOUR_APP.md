# 🚀 Deploy Your App - Complete Guide

## 🎯 Goal
Deploy your Moviefy app with database and backend so it's accessible from anywhere, anytime, on any device.

**Time:** 30 minutes  
**Cost:** $0 (FREE)  
**Result:** Live app with real database, accessible 24/7 from anywhere

---

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ GitHub account (you already have this)
- ✅ Google account (for MongoDB Atlas signup)
- ✅ 30 minutes of time
- ✅ Your code pushed to GitHub (already done)

---

## 🎯 Overview

We'll deploy 3 services:

```
1. MongoDB Atlas → Database (stores your data)
2. Railway → Backend API (handles requests)
3. Vercel → Frontend (your website)
```

All are FREE and work together!

---

## 📋 What We'll Deploy

```
Your App (Always Online)
    ↓
Vercel (Frontend) - FREE
    ↓
Railway (Backend) - FREE
    ↓
MongoDB Atlas (Database) - FREE
```

---

## 🚀 STEP 1: MongoDB Atlas (Database) - 10 minutes

### Why MongoDB Atlas?
- Cloud database (always online)
- FREE tier (512MB storage)
- No installation needed

### 1.1 Create Account

🔗 **Go to:** https://www.mongodb.com/cloud/atlas/register

1. Click **"Sign up"**
2. Choose **"Sign up with Google"** (fastest)
3. Select your Google account
4. ✅ You're logged in!

### 1.2 Create Free Cluster

1. Click **"Build a Database"** (big green button)
2. Choose **"M0 FREE"** tier
   - Look for "Shared" option
   - Says "FREE" and "512 MB Storage"
3. **Provider:** AWS (recommended)
4. **Region:** Choose closest to you
   - India → Mumbai (ap-south-1)
   - USA → Virginia (us-east-1)
   - Europe → Ireland (eu-west-1)
5. **Cluster Name:** `Moviefy`
6. Click **"Create"**
7. ⏳ Wait 3-5 minutes (cluster is being created)

### 1.3 Create Database User

1. Click **"Database Access"** (left sidebar under Security)
2. Click **"+ ADD NEW DATABASE USER"**
3. **Username:** `moviefy`
4. **Password:** Click **"Autogenerate Secure Password"**
5. **📝 IMPORTANT:** Copy and save this password immediately!
   ```
   Password: ___________________________
   ```
6. **Database User Privileges:** "Read and write to any database" (default)
7. Click **"Add User"**

### 1.4 Allow Network Access

1. Click **"Network Access"** (left sidebar under Security)
2. Click **"+ ADD IP ADDRESS"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"**
4. Confirm it shows: `0.0.0.0/0`
5. Click **"Confirm"**

### 1.5 Get Connection String

1. Click **"Database"** (left sidebar)
2. Wait for cluster to show "Active" status (green)
3. Click **"Connect"** button on your cluster
4. Choose **"Connect your application"**
5. **Driver:** Node.js (should be selected)
6. **Version:** 4.1 or later
7. Copy the connection string

**It looks like:**
```
mongodb+srv://moviefy:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 1.6 Prepare Your Connection String

Replace `<password>` with your actual password and add database name:

**Before:**
```
mongodb+srv://moviefy:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After:**
```
mongodb+srv://moviefy:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
```

**📝 Save this complete connection string!**

**✅ MongoDB Atlas Complete!**

---

## 🚀 STEP 2: Railway (Backend) - 10 minutes

### Why Railway?
- Deploys Node.js apps easily
- FREE tier ($5 credit/month)
- Auto-deploys from GitHub

### 2.1 Create Account

🔗 **Go to:** https://railway.app/

1. Click **"Login"**
2. Click **"Login with GitHub"**
3. Click **"Authorize Railway"**
4. ✅ You're logged in!

### 2.2 Create New Project

1. Click **"New Project"** (or "+ New")
2. Choose **"Deploy from GitHub repo"**
3. You'll see your GitHub repositories
4. Find and select **"moviefy"**
5. Railway will scan your repository

### 2.3 Configure Backend Service

1. Railway should detect your backend automatically
2. If it creates multiple services, select the backend one
3. Click **"Settings"** tab
4. Find **"Root Directory"**
5. Set to: `backend`
6. Click **"Save"**

### 2.4 Add Environment Variables

1. Click **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables one by one:

**Variable 1:**
```
Name: PORT
Value: 5000
```

**Variable 2:**
```
Name: MONGODB_URI
Value: [Paste your MongoDB connection string from Step 1.6]
```

**Variable 3:**
```
Name:JWT_SECRET
Value: moviefy_super_secret_key_change_this_in_production_12345
```

**Variable 4:**
```
Name: FRONTEND_URL
Value: http://localhost:5173
```
(We'll update this after deploying frontend)

### 2.5 Generate Public Domain

1. Click **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. You'll get a URL like: `moviefy-backend-production.up.railway.app`

**📝 Copy and save this URL:**
```
Backend URL: https://_____________________________.up.railway.app
```

### 2.6 Verify Deployment

1. Click **"Deployments"** tab
2. Wait for deployment to complete
3. Look for green checkmark ✅ "Success"
4. If failed, click "View Logs" to see errors

**✅ Railway Backend Complete!**

---

## 🚀 STEP 3: Vercel (Frontend) - 10 minutes

### Why Vercel?
- Perfect for React/Vite apps
- FREE tier (100GB bandwidth)
- Auto-deploys from GitHub

### 3.1 Create Account

🔗 **Go to:** https://vercel.com/signup

1. Click **"Continue with GitHub"**
2. Click **"Authorize Vercel"**
3. ✅ You're logged in!

### 3.2 Import Project

1. Click **"Add New..."** (top right)
2. Click **"Project"**
3. You'll see your GitHub repositories
4. Find **"moviefy"**
5. Click **"Import"**

### 3.3 Configure Project

**Root Directory (IMPORTANT!):**
1. Find **"Root Directory"**
2. Click **"Edit"**
3. Select **"frontend"** from dropdown
4. Click **"Continue"**

**Framework Preset:**
- Should auto-detect as **"Vite"**
- If not, select "Vite" from dropdown

**Build Settings (should be auto-filled):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.4 Add Environment Variables

1. Scroll to **"Environment Variables"**
2. Add these variables:

**Variable 1:**
```
Name: VITE_API_URL
Value: https://your-railway-url.up.railway.app/api
```
(Replace with your Railway URL from Step 2.5)

**Variable 2:**
```
Name: VITE_GOOGLE_CLIENT_ID
Value: 652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

### 3.5 Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. Vercel will build and deploy your app
4. You'll see "Congratulations!" when done

### 3.6 Get Your Live URL

1. You'll see your live URL like: `https://moviefy-abc123.vercel.app`

**📝 Copy and save this URL:**
```
Frontend URL: https://_____________________________.vercel.app
```

**✅ Vercel Frontend Complete!**

---

## 🚀 STEP 4: Connect Everything - 5 minutes

### 4.1 Update Railway Backend

1. Go back to Railway dashboard
2. Click on your backend service
3. Click **"Variables"** tab
4. Find **"FRONTEND_URL"**
5. Click to edit
6. Update to your Vercel URL: `https://moviefy-abc123.vercel.app`
7. Click **"Save"**
8. Railway will automatically redeploy (wait 1-2 minutes)

### 4.2 Verify Deployment

1. Click **"Deployments"** tab in Railway
2. Wait for new deployment to complete
3. Look for green checkmark ✅

**✅ Everything Connected!**

---

## 🎉 YOU'RE LIVE!

### Your Live URLs:

**Main App (Share this!):**
```
https://moviefy-abc123.vercel.app
```

**Backend API:**
```
https://moviefy-backend-production.up.railway.app
```

**Database:**
```
MongoDB Atlas (cloud)
```

---

## 📱 Test Your Deployment

### On Computer:
1. Open your Vercel URL
2. Create a new account
3. Login
4. Browse movies
5. Add to watchlist
6. ✅ Everything should work!

### On Phone:
1. Open browser on phone
2. Go to your Vercel URL
3. Login
4. Test all features
5. ✅ Works from anywhere!

### Share with Friends:
1. Send them your Vercel URL
2. They can access from anywhere
3. ✅ No restrictions!

---

## 🔄 Future Updates

### When You Make Changes:

```bash
# Make your changes to code
git add .
git commit -m "Your update message"
git push
```

**That's it!**
- Railway will auto-deploy backend
- Vercel will auto-deploy frontend
- No manual deployment needed!

---

## 💰 Cost Breakdown

**Everything is FREE!**

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 FREE | $0/month |
| Railway | Hobby (Free) | $0/month |
| Vercel | Hobby (Free) | $0/month |
| **Total** | | **$0/month** |

**Free tier limits:**
- MongoDB: 512MB storage
- Railway: $5 credit/month
- Vercel: 100GB bandwidth/month

**More than enough for your app!**

---

## 🆘 Troubleshooting

### Backend Issues

**Problem:** Backend deployment failed

**Solutions:**
1. Check Railway logs (Deployments → View Logs)
2. Verify MONGODB_URI is correct
3. Make sure Root Directory is set to `backend`
4. Check all environment variables are set

**Problem:** Can't connect to database

**Solutions:**
1. Verify MongoDB connection string
2. Check password is correct (no spaces)
3. Ensure Network Access allows 0.0.0.0/0
4. Wait 5 minutes after creating cluster

### Frontend Issues

**Problem:** Frontend build failed

**Solutions:**
1. Check Vercel build logs
2. Verify Root Directory is set to `frontend`
3. Make sure VITE_API_URL is correct
4. Try redeploying

**Problem:** Can't connect to backend

**Solutions:**
1. Verify VITE_API_URL includes `/api` at the end
2. Check Railway backend is running
3. Update FRONTEND_URL in Railway
4. Clear browser cache

### General Issues

**Problem:** App loads but features don't work

**Solutions:**
1. Check browser console for errors (F12)
2. Verify all environment variables are set
3. Make sure Railway FRONTEND_URL matches Vercel URL
4. Try hard refresh (Ctrl+Shift+R)

---

## ✅ Deployment Checklist

### MongoDB Atlas:
- [ ] Account created
- [ ] Free M0 cluster created
- [ ] Database user created (username: moviefy)
- [ ] Password saved
- [ ] Network access allowed (0.0.0.0/0)
- [ ] Connection string copied and modified

### Railway:
- [ ] Account created (with GitHub)
- [ ] Project created from GitHub repo
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Domain generated
- [ ] Deployment successful (green checkmark)
- [ ] Backend URL saved

### Vercel:
- [ ] Account created (with GitHub)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Frontend URL saved

### Connection:
- [ ] Railway FRONTEND_URL updated with Vercel URL
- [ ] Backend redeployed successfully
- [ ] Tested on computer
- [ ] Tested on phone
- [ ] All features working

---

## 🎯 What You Achieved

After completing this guide:

✅ **Professional Deployment**
- Your app is hosted on industry-standard platforms
- Production-ready infrastructure
- Scalable and reliable

✅ **Always Online**
- 24/7 availability
- No need to run local servers
- Automatic updates

✅ **Accessible Everywhere**
- Works on any device
- Access from anywhere in the world
- Share with anyone

✅ **FREE Hosting**
- $0/month cost
- No credit card required
- Free forever on free tiers

✅ **Auto-Deploy**
- Push code → Auto-updates
- No manual deployment
- Continuous deployment

---

## 📊 Your Deployment Architecture

```
User (Anywhere in World)
        ↓
Vercel (Frontend)
https://moviefy-abc123.vercel.app
        ↓
Railway (Backend API)
https://moviefy-backend.up.railway.app
        ↓
MongoDB Atlas (Database)
Cloud Database (Always Online)
```

**Everything in the cloud!**
**Always accessible!**
**Completely FREE!**

---

## 🎓 Next Steps (Optional)

### 1. Custom Domain
- Buy a domain (e.g., moviefy.com)
- Connect to Vercel
- Professional URL!

### 2. Google OAuth
- Configure OAuth consent screen
- Add production URLs
- Real Google login!

### 3. Analytics
- Add Google Analytics
- Track users
- Monitor usage

### 4. Monitoring
- Set up error tracking
- Monitor performance
- Get alerts

---

## 📞 Need Help?

### During Deployment:
- Follow each step carefully
- Don't skip any steps
- Save all URLs and passwords

### If Stuck:
- Check the troubleshooting section
- Review the checklist
- Verify all settings

### Still Need Help:
- Tell me which step you're on
- Share any error messages
- I'll help you fix it!

---

## 🎉 Congratulations!

Once deployed, your app will be:
- ✅ Live and accessible from anywhere
- ✅ Always online (24/7)
- ✅ Professional and scalable
- ✅ FREE to host
- ✅ Easy to update

**Share your app with the world!** 🌍

---

**Ready to deploy? Start with Step 1!** 🚀
