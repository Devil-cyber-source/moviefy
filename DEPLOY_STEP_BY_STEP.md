# 🚀 Deploy Your App - Access from Anywhere

## 🎯 Goal

Deploy your app so it's:
- ✅ Always online (24/7)
- ✅ Accessible from any device
- ✅ No need to run servers manually
- ✅ FREE hosting

**Time: 25 minutes**
**Cost: $0**

---

## 📋 What We'll Use

1. **MongoDB Atlas** - Database (FREE)
2. **Railway** - Backend hosting (FREE)
3. **Vercel** - Frontend hosting (FREE)

---

## 🚀 Step 1: MongoDB Atlas (Database) - 5 minutes

### 1.1 Create Account
🔗 https://www.mongodb.com/cloud/atlas/register

- Click "Sign up"
- Use Google sign-in (fastest)
- ✅ Account created!

### 1.2 Create Free Cluster
- Click "Build a Database"
- Choose **"M0 FREE"** (the free tier)
- Provider: AWS
- Region: Choose closest to you (e.g., Mumbai, Singapore)
- Cluster Name: `Moviefy`
- Click "Create"
- ⏳ Wait 3-5 minutes

### 1.3 Create Database User
- Click "Database Access" (left sidebar)
- Click "+ ADD NEW DATABASE USER"
- Username: `moviefy`
- Password: Click "Autogenerate Secure Password"
- **📝 COPY THIS PASSWORD!** (Save it somewhere safe!)
- Database User Privileges: "Read and write to any database"
- Click "Add User"

### 1.4 Allow Network Access
- Click "Network Access" (left sidebar)
- Click "+ ADD IP ADDRESS"
- Click "ALLOW ACCESS FROM ANYWHERE"
- Confirm: 0.0.0.0/0
- Click "Confirm"

### 1.5 Get Connection String
- Click "Database" (left sidebar)
- Click "Connect" button on your cluster
- Choose "Connect your application"
- Driver: Node.js
- Copy the connection string

**Example:**
```
mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**📝 SAVE THIS!** Replace `YOUR_PASSWORD` with the password from step 1.3

**✅ MongoDB Done!**

---

## 🚀 Step 2: Railway (Backend) - 8 minutes

### 2.1 Create Account
🔗 https://railway.app/

- Click "Login"
- **Sign in with GitHub** (important!)
- Authorize Railway
- ✅ Account created!

### 2.2 Create New Project from GitHub
- Click "New Project"
- Choose "Deploy from GitHub repo"
- Select your repository: `moviefy`
- Railway will scan your repo

### 2.3 Select Backend Folder
- Railway should detect your backend
- If asked, set Root Directory: `backend`
- Click "Deploy"

### 2.4 Add Environment Variables
- Click on your service
- Click "Variables" tab
- Click "New Variable"

Add these one by one:

```
PORT
5000
```

```
MONGODB_URI
mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
```
(Replace with your actual connection string from Step 1.5)

```
JWT_SECRET
moviefy_super_secret_key_change_this_in_production_12345
```

```
FRONTEND_URL
http://localhost:5173
```
(We'll update this after deploying frontend)

### 2.5 Generate Domain
- Click "Settings" tab
- Scroll to "Networking"
- Click "Generate Domain"
- You'll get something like: `moviefy-backend-production.up.railway.app`

**📝 COPY THIS URL!** You'll need it next.

### 2.6 Verify Deployment
- Click "Deployments" tab
- Wait for "Success" status (green checkmark)
- Click "View Logs" to check for errors

**✅ Backend Done!**

---

## 🚀 Step 3: Vercel (Frontend) - 8 minutes

### 3.1 Create Account
🔗 https://vercel.com/signup

- **Sign up with GitHub** (important!)
- Authorize Vercel
- ✅ Account created!

### 3.2 Import Project
- Click "Add New..." → "Project"
- You'll see your GitHub repositories
- Click "Import" on `moviefy`

### 3.3 Configure Project
- Framework Preset: **Vite** (should auto-detect)
- Root Directory: Click "Edit" → Select `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.4 Add Environment Variables
Click "Environment Variables" and add:

**Variable 1:**
```
Name: VITE_API_URL
Value: https://your-railway-url.up.railway.app/api
```
(Replace `your-railway-url` with your Railway URL from Step 2.5)

**Variable 2:**
```
Name: VITE_GOOGLE_CLIENT_ID
Value: 652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

### 3.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- You'll get a URL like: `https://moviefy-abc123.vercel.app`

**📝 COPY THIS URL!** This is your live app!

**✅ Frontend Done!**

---

## 🚀 Step 4: Connect Everything - 2 minutes

### 4.1 Update Railway FRONTEND_URL
- Go back to Railway dashboard
- Click your service
- Click "Variables" tab
- Find `FRONTEND_URL`
- Update to: `https://moviefy-abc123.vercel.app` (your Vercel URL)
- Railway will auto-redeploy (wait 1 minute)

### 4.2 Verify Everything Works
- Go to your Vercel URL: `https://moviefy-abc123.vercel.app`
- Try creating an account
- Try logging in
- Browse movies
- ✅ Everything should work!

**✅ All Done!**

---

## 🎉 You're Live!

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

## 📱 Test Your App

### On Computer:
1. Go to your Vercel URL
2. Create account or login
3. Browse movies
4. ✅ Works!

### On Phone:
1. Open browser on phone
2. Go to your Vercel URL
3. Login
4. ✅ Works from anywhere!

### Share with Friends:
1. Send them your Vercel URL
2. They can access from anywhere!
3. ✅ No restrictions!

---

## 🔄 Future Updates

### When You Make Changes:

**Update Code:**
```bash
# Make your changes
git add .
git commit -m "Your changes"
git push
```

**Auto-Deploy:**
- Railway will auto-deploy backend
- Vercel will auto-deploy frontend
- No manual work needed!

---

## 💰 Cost

**Everything is FREE!**
- MongoDB Atlas: FREE (512MB storage)
- Railway: FREE ($5 credit/month)
- Vercel: FREE (100GB bandwidth)

**Total: $0/month** ✅

---

## 🆘 Troubleshooting

### "Cannot connect to backend"

**Check Railway Logs:**
1. Go to Railway dashboard
2. Click "Deployments"
3. Click "View Logs"
4. Look for errors

**Common fixes:**
- Verify MONGODB_URI is correct
- Check FRONTEND_URL matches Vercel URL
- Verify all environment variables are set

### "Build failed on Vercel"

**Check Build Logs:**
1. Go to Vercel dashboard
2. Click "Deployments"
3. Click failed deployment
4. Read error message

**Common fixes:**
- Verify environment variables are set
- Check Root Directory is set to `frontend`
- Try redeploying

### "Database connection failed"

**Check MongoDB Atlas:**
1. Network Access: Is 0.0.0.0/0 allowed?
2. Connection string: Is password correct?
3. User: Has read/write permissions?

---

## ✅ Checklist

Track your progress:

### MongoDB Atlas:
- [ ] Account created
- [ ] Free cluster created
- [ ] Database user created
- [ ] Password saved
- [ ] Network access allowed (0.0.0.0/0)
- [ ] Connection string copied

### Railway:
- [ ] Account created (with GitHub)
- [ ] Project created from GitHub
- [ ] Backend deployed
- [ ] Environment variables added
- [ ] Domain generated
- [ ] URL copied

### Vercel:
- [ ] Account created (with GitHub)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] URL copied

### Connection:
- [ ] Railway FRONTEND_URL updated
- [ ] Tested on computer
- [ ] Tested on phone
- [ ] Shared with friends

---

## 🎯 What You Get

After deployment:

✅ **Always Online** - 24/7 availability
✅ **No Manual Servers** - Everything automatic
✅ **Access Anywhere** - Any device, any location
✅ **Auto-Deploy** - Push code → Auto-updates
✅ **FREE Hosting** - $0/month
✅ **Professional** - Production-ready
✅ **Scalable** - Handles traffic automatically

---

## 📊 Your Deployment Architecture

```
User's Device (Anywhere in World)
        ↓
Vercel (Frontend)
https://moviefy-abc123.vercel.app
        ↓
Railway (Backend API)
https://moviefy-backend.up.railway.app
        ↓
MongoDB Atlas (Database)
Cloud Database
```

**Everything in the cloud!**
**Always online!**
**Accessible from anywhere!**

---

## 🎉 Success!

Once deployed, your app will be:
- ✅ Live at your Vercel URL
- ✅ Accessible from any device
- ✅ Always online (24/7)
- ✅ No need to run servers
- ✅ Auto-updates when you push code
- ✅ FREE forever (on free tiers)

---

**Ready to deploy? Follow the steps above!** 🚀

**Need help? Just ask!** 💬
