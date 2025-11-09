# 🤖 Automated Deployment - I'll Do Most of It!

## 🎯 What I've Created

I've created automated scripts that will do 90% of the work. You just need to:
1. Create accounts (5 minutes)
2. Run my script (it does everything else)

---

## 📋 Prerequisites (5 minutes)

### Create These Accounts (All FREE):

1. **GitHub Account**
   - Go to: https://github.com/signup
   - Sign up (free)
   - ✅ Done!

2. **MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google (fastest)
   - Create free cluster (M0)
   - Create user: `moviefy` / generate password
   - Allow all IPs (0.0.0.0/0)
   - Copy connection string
   - ✅ Done!

3. **Railway Account**
   - Go to: https://railway.app/
   - Sign in with GitHub
   - ✅ Done!

4. **Vercel Account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub
   - ✅ Done!

---

## 🚀 Automated Deployment (5 minutes)

### Step 1: Push to GitHub

Run these commands (replace YOUR_USERNAME):

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/moviefy.git

# Push code
git branch -M main
git push -u origin main
```

### Step 2: Run Automated Script

```powershell
# Run the automated deployment script
powershell -ExecutionPolicy Bypass -File deploy-all.ps1
```

**The script will:**
- ✅ Install Railway CLI
- ✅ Install Vercel CLI
- ✅ Deploy backend to Railway
- ✅ Set environment variables
- ✅ Deploy frontend to Vercel
- ✅ Connect everything

**You just need to:**
- Login when prompted
- Enter your MongoDB connection string
- Copy/paste URLs when asked

---

## 📝 What the Script Does

### Automatically:
1. ✅ Installs Railway CLI
2. ✅ Installs Vercel CLI
3. ✅ Deploys backend to Railway
4. ✅ Sets environment variables
5. ✅ Deploys frontend to Vercel
6. ✅ Creates production config
7. ✅ Connects backend and frontend

### You Need To:
1. Login to Railway (browser opens)
2. Login to Vercel (browser opens)
3. Enter MongoDB connection string
4. Copy/paste URLs when asked
5. Add environment variables to Vercel dashboard

---

## 🎯 Step-by-Step

### 1. Create GitHub Repository
- Go to: https://github.com/new
- Name: `moviefy`
- Create repository

### 2. Push Code
```powershell
git remote add origin https://github.com/YOUR_USERNAME/moviefy.git
git branch -M main
git push -u origin main
```

### 3. Get MongoDB Connection String
- Go to MongoDB Atlas
- Click "Connect"
- Copy connection string
- Replace `<password>` with your password

### 4. Run Deployment Script
```powershell
powershell -ExecutionPolicy Bypass -File deploy-all.ps1
```

### 5. Follow Prompts
- Login to Railway when browser opens
- Login to Vercel when browser opens
- Enter MongoDB connection string
- Enter Railway URL when asked
- Enter Vercel URL when asked

### 6. Add Vercel Environment Variables
- Go to: https://vercel.com/dashboard
- Click your project
- Settings → Environment Variables
- Add:
  - `VITE_API_URL` = Your Railway URL + `/api`
  - `VITE_GOOGLE_CLIENT_ID` = `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com`
- Redeploy

### 7. Done!
- Your app is live!
- Test it on your phone!

---

## 🆘 If Script Doesn't Work

### Manual Deployment (Still Easy):

**Backend:**
```powershell
npm install -g @railway/cli
railway login
cd backend
railway up
```

**Frontend:**
```powershell
npm install -g vercel
vercel login
vercel --prod
```

---

## 💡 Alternative: Manual Deployment

If you prefer manual control, follow:
- **DEPLOY_WITH_GITHUB.md** - Full manual guide
- **DEPLOY_WITHOUT_GIT.md** - Without GitHub

---

## 🎉 What You'll Get

After running the script:

**Your Live App:**
```
https://moviefy-abc123.vercel.app
```

**Accessible from:**
- ✅ Anywhere in the world
- ✅ Any device
- ✅ Always online (24/7)
- ✅ FREE hosting

---

## 📊 Time Breakdown

| Task | Time |
|------|------|
| Create accounts | 5 min |
| Push to GitHub | 1 min |
| Run script | 3 min |
| Add Vercel env vars | 1 min |
| **Total** | **10 min** |

---

## ✅ Checklist

- [ ] GitHub account created
- [ ] MongoDB Atlas account created
- [ ] Railway account created
- [ ] Vercel account created
- [ ] MongoDB connection string copied
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Ran deployment script
- [ ] Added Vercel environment variables
- [ ] Tested app on phone

---

**Ready? Run the script!**

```powershell
powershell -ExecutionPolicy Bypass -File deploy-all.ps1
```

**Need help? Just ask!** 💬
