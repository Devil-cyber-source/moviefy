# 🚀 Railway Deployment Guide - Moviefy

## Why Railway?
✅ **Simplest** - Deploy everything in one place  
✅ **Free** - $5 credit/month (enough for small apps)  
✅ **Fast** - Deploy in 5 minutes  
✅ **Automatic** - Auto-deploys on git push  

---

## 📋 Step-by-Step Deployment

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign in with GitHub

### Step 2: Deploy MongoDB Database
1. Click **"+ New"** → **"Database"** → **"Add MongoDB"**
2. Wait for it to deploy (1-2 minutes)
3. Click on MongoDB → **"Variables"** tab
4. Copy the **MONGO_URL** value (looks like: `mongodb://mongo:...`)

### Step 3: Deploy Backend
1. Click **"+ New"** → **"GitHub Repo"** → Select **moviefy**
2. **IMPORTANT**: Click **"Settings"** → **"Root Directory"** → Set to `backend` (do this FIRST!)
3. Click **"Variables"** tab → **"Add variables"**:
   ```
  MONGODB_URI = <paste the MONGO_URL from Step 2>
   JWT_SECRET = moviefy_secret_key_2024_change_in_production_12345
   PORT = 5000
   FRONTEND_URL = https://your-frontend-url.railway.app
   ```
4. Click **"Deployments"** → **"Redeploy"** (if needed)
5. Once deployed, click **"Settings"** → **"Networking"** → **"Generate Domain"**
6. Copy your backend URL (e.g., `https://moviefy-backend.up.railway.app`)

### Step 4: Deploy Frontend
1. Click **"+ New"** → **"GitHub Repo"** → Select **moviefy** again
2. **IMPORTANT**: Click **"Settings"** → **"Root Directory"** → Set to `frontend` (do this FIRST!)
3. Click **"Variables"** tab → **"Add variables"**:
   ```
   VITE_API_URL = <paste your backend URL from Step 3>
   ```
4. Click **"Deployments"** → **"Redeploy"** (if needed)
5. Once deployed, click **"Settings"** → **"Networking"** → **"Generate Domain"**
6. Copy your frontend URL (e.g., `https://moviefy.up.railway.app`)

### Step 5: Update Backend FRONTEND_URL
1. Go back to your **Backend service**
2. Click **"Variables"**
3. Update **FRONTEND_URL** with your frontend URL from Step 4
4. Click **"Redeploy"**

---

## ✅ You're Done!

Your app is now live at:
- **Frontend**: `https://moviefy.railway.app`
- **Backend**: `https://moviefy-backend.railway.app`
- **Database**: Managed by Railway

---

## 🔄 Auto-Deploy on Git Push

Railway automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update app"
git push
```

Railway will detect the changes and redeploy automatically!

---

## 💰 Free Tier Limits

Railway gives you **$5 credit/month** which includes:
- ✅ 500 hours of runtime
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Automatic SSL

This is enough for:
- Small to medium traffic apps
- Development/testing
- Personal projects

---

## 🐛 Troubleshooting

### "Route not found" error?
**This means Railway is using the wrong root directory!**

**Fix:**
1. Go to your service in Railway
2. Click **"Settings"** → **"Root Directory"**
3. Set to `backend` for backend service
4. Set to `frontend` for frontend service
5. Click **"Redeploy"**

### Backend won't start?
- Check **"Deployments"** tab for error logs
- Verify all environment variables are set
- Make sure MONGODB_URI is correct
- Verify Root Directory is set to `backend`

### Frontend shows blank page?
- Check VITE_API_URL is set correctly
- Verify Root Directory is set to `frontend`
- Check build logs for errors

### Frontend shows API errors?
- Check VITE_API_URL is set correctly (should end with your backend domain)
- Make sure backend is deployed and running
- Test backend URL directly: `https://your-backend.railway.app/api/health`

### Database connection failed?
- Verify MONGODB_URI in backend variables
- Check MongoDB service is running
- Try redeploying backend

---

## 📊 Monitor Your App

1. Click on each service to see:
   - **Deployments** - Build logs
   - **Metrics** - CPU, Memory, Network usage
   - **Logs** - Real-time application logs

---

## 🎯 Next Steps

1. **Custom Domain**: Settings → Domains → Add custom domain
2. **Environment Variables**: Add production API keys (Razorpay, etc.)
3. **Monitoring**: Set up alerts for downtime
4. **Scaling**: Upgrade plan if you need more resources

---

## 🆘 Need Help?

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Check deployment logs in Railway dashboard

---

**Your app will be accessible from anywhere, anytime! 🌍**
