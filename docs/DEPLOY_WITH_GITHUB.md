# 🚀 Deploy to Cloud with GitHub

## ✅ Git Setup Complete!

I've initialized Git and created your first commit. Now let's deploy!

---

## 📋 Quick Deployment Steps

### Step 1: Push to GitHub (5 min)
### Step 2: MongoDB Atlas (5 min)
### Step 3: Railway Backend (5 min)
### Step 4: Vercel Frontend (5 min)

**Total: 20 minutes**

---

## Step 1: Push to GitHub 🐙

### 1.1 Create GitHub Repository

🔗 Go to: https://github.com/new

- Repository name: `moviefy`
- Description: `Netflix-like streaming platform`
- Visibility: **Private** (recommended) or Public
- **DON'T** initialize with README (we already have code)
- Click "Create repository"

### 1.2 Push Your Code

Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/moviefy.git
git branch -M main
git push -u origin main
```

**Or run these commands:**

```bash
# Add your GitHub repository URL
git remote add origin https://github.com/YOUR_USERNAME/moviefy.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username!

### 1.3 Verify
- Refresh your GitHub repository page
- You should see all your files!

**✅ GitHub Done!**

---

## Step 2: MongoDB Atlas (Database) ☁️

### 2.1 Create Account
🔗 Go to: https://www.mongodb.com/cloud/atlas/register

- Sign up with Google (fastest)
- ✅ Account created!

### 2.2 Create Free Cluster
- Click "Build a Database"
- Choose **"M0 FREE"**
- Provider: AWS
- Region: Choose closest to you
- Cluster Name: `Moviefy`
- Click "Create"
- ⏳ Wait 3 minutes

### 2.3 Create Database User
- Click "Database Access" (left menu)
- Click "+ ADD NEW DATABASE USER"
- Username: `moviefy`
- Password: Click "Autogenerate" → **COPY PASSWORD!**
- Privileges: "Read and write to any database"
- Click "Add User"

### 2.4 Allow Network Access
- Click "Network Access" (left menu)
- Click "+ ADD IP ADDRESS"
- Click "ALLOW ACCESS FROM ANYWHERE"
- Confirm: 0.0.0.0/0
- Click "Confirm"

### 2.5 Get Connection String
- Click "Database" (left menu)
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy connection string

**Example:**
```
mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**📝 SAVE THIS!** Replace `YOUR_PASSWORD` with password from step 2.3

**✅ MongoDB Done!**

---

## Step 3: Railway (Backend) 🚂

### 3.1 Create Account
🔗 Go to: https://railway.app/

- Click "Login"
- **Sign in with GitHub** (important!)
- Authorize Railway
- ✅ Account created!

### 3.2 Create New Project from GitHub
- Click "New Project"
- Choose "Deploy from GitHub repo"
- Select your repository: `moviefy`
- Railway will detect your backend automatically

**If it doesn't auto-detect backend:**
- Click "Add Service"
- Choose "GitHub Repo"
- Select `moviefy`
- Root Directory: `backend`

### 3.3 Add Environment Variables
- Click on your service
- Click "Variables" tab
- Click "New Variable"

Add these:

```
PORT
5000

MONGODB_URI
mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority

JWT_SECRET
moviefy_super_secret_key_change_this_in_production_12345

FRONTEND_URL
https://moviefy.vercel.app
```

**Note:** We'll update FRONTEND_URL with your actual Vercel URL later

### 3.4 Generate Domain
- Click "Settings" tab
- Scroll to "Networking"
- Click "Generate Domain"
- You'll get: `moviefy-backend-production.up.railway.app`

**📝 COPY THIS URL!**

### 3.5 Deploy
- Click "Deployments" tab
- Railway will auto-deploy from GitHub
- Wait for "Success" status (green)

**✅ Backend Done!**

---

## Step 4: Vercel (Frontend) ⚡

### 4.1 Create Account
🔗 Go to: https://vercel.com/signup

- **Sign up with GitHub** (important!)
- Authorize Vercel
- ✅ Account created!

### 4.2 Import Project
- Click "Add New..." → "Project"
- You'll see your GitHub repositories
- Click "Import" on `moviefy`

### 4.3 Configure Project
- Framework Preset: **Vite** (auto-detected)
- Root Directory: `./` (leave as is)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4.4 Add Environment Variables
Click "Environment Variables" and add:

```
Name: VITE_API_URL
Value: https://your-railway-url.up.railway.app/api

Name: VITE_GOOGLE_CLIENT_ID
Value: 652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

**Replace `your-railway-url` with your Railway URL from Step 3.4**

### 4.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- You'll get: `https://moviefy-abc123.vercel.app`

**📝 COPY THIS URL!**

**✅ Frontend Done!**

---

## Step 5: Connect Everything 🔗

### 5.1 Update Railway FRONTEND_URL
- Go back to Railway
- Click your service
- Click "Variables"
- Update `FRONTEND_URL` to your Vercel URL
- Railway will auto-redeploy

### 5.2 Update Vercel Environment Variables (if needed)
- Go to Vercel dashboard
- Click your project
- Click "Settings" → "Environment Variables"
- Verify `VITE_API_URL` has correct Railway URL
- If changed, click "Redeploy"

**✅ Everything Connected!**

---

## 🎉 You're Live!

### Your URLs:

**Main App (Share this!):**
```
https://moviefy-abc123.vercel.app
```

**Backend API:**
```
https://moviefy-backend-production.up.railway.app
```

**GitHub Repository:**
```
https://github.com/YOUR_USERNAME/moviefy
```

---

## 📱 Test Your Deployment

### On Computer:
1. Go to your Vercel URL
2. Create account
3. Browse movies
4. ✅ Works!

### On Phone:
1. Open browser
2. Go to your Vercel URL
3. Login
4. ✅ Works from anywhere!

### Share with Friends:
1. Send Vercel URL
2. They can access from anywhere!
3. ✅ No restrictions!

---

## 🔄 Future Updates

### When You Make Changes:

```bash
# Make your changes to code
# Then:

git add .
git commit -m "Your update message"
git push
```

**That's it!**
- Railway will auto-deploy backend
- Vercel will auto-deploy frontend
- No manual deployment needed!

---

## 🆘 Troubleshooting

### "Cannot connect to backend"

**Check Railway Logs:**
- Go to Railway dashboard
- Click "Deployments"
- Click "View Logs"
- Look for errors

**Common fixes:**
- Verify MONGODB_URI is correct
- Check FRONTEND_URL matches Vercel URL
- Verify all environment variables are set

### "Build failed on Vercel"

**Check Build Logs:**
- Go to Vercel dashboard
- Click "Deployments"
- Click failed deployment
- Read error message

**Common fixes:**
- Verify environment variables are set
- Check if all dependencies are in package.json
- Try redeploying

### "Database connection failed"

**Check MongoDB Atlas:**
- Network Access: 0.0.0.0/0 allowed?
- Connection string: Password correct?
- User: Has read/write permissions?

---

## 💰 Cost

**Everything is FREE!**
- GitHub: FREE (unlimited private repos)
- MongoDB Atlas: FREE (512MB)
- Railway: FREE ($5 credit/month)
- Vercel: FREE (100GB bandwidth)

**Total: $0/month** ✅

---

## 🎯 Deployment Checklist

### GitHub:
- [x] Git initialized
- [x] First commit created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

### MongoDB Atlas:
- [ ] Account created
- [ ] Free cluster created
- [ ] Database user created
- [ ] Network access allowed
- [ ] Connection string saved

### Railway:
- [ ] Account created (with GitHub)
- [ ] Project created from GitHub
- [ ] Environment variables added
- [ ] Domain generated
- [ ] Deployment successful

### Vercel:
- [ ] Account created (with GitHub)
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] URL copied

### Connection:
- [ ] Railway FRONTEND_URL updated
- [ ] Tested on computer
- [ ] Tested on phone
- [ ] Shared with friends

---

## 🚀 Benefits of This Setup

✅ **Auto-deployment:** Push to GitHub → Auto-deploys
✅ **Version control:** Track all changes
✅ **Rollback:** Easy to revert if something breaks
✅ **Collaboration:** Others can contribute
✅ **Professional:** Industry-standard workflow
✅ **FREE:** All services on free tier

---

## 📊 Your Deployment Architecture

```
GitHub Repository
    ↓
Railway (Backend)
    ↓
MongoDB Atlas (Database)

GitHub Repository
    ↓
Vercel (Frontend)
    ↓
Users Worldwide!
```

---

## 🎓 Pro Tips

1. **Use branches:** Create feature branches for new features
2. **Commit often:** Small, frequent commits are better
3. **Write good commit messages:** Describe what changed
4. **Test locally first:** Make sure it works before pushing
5. **Check logs:** If deployment fails, check logs first

---

## 📝 Quick Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main
```

---

**Ready to deploy? Follow the steps above!** 🚀

**Need help? Just ask!** 💬
