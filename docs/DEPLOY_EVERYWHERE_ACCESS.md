# 🌐 Deploy Your App - Access from Anywhere

## 🎯 Goal

Make your Moviefy app accessible from:
- ✅ Your phone
- ✅ Other computers
- ✅ Anywhere in the world
- ✅ Without running servers manually

---

## 🚀 Deployment Options

### Option 1: Quick Deploy (Recommended - 15 minutes)
**Best for:** Getting online fast, free hosting

**Services:**
- Frontend: Vercel (Free)
- Backend: Railway (Free)
- Database: MongoDB Atlas (Free)

---

### Option 2: Professional Deploy (30 minutes)
**Best for:** Production apps, custom domains

**Services:**
- Frontend: Netlify/Vercel
- Backend: Render/Railway
- Database: MongoDB Atlas
- Domain: Your custom domain

---

## 🎯 Quick Deploy Guide (Option 1)

### Part A: Deploy Database (MongoDB Atlas)

#### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (use Google sign-in for faster setup)
3. Choose **"Free"** tier (M0)

#### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select region closest to you
4. Cluster name: `Moviefy`
5. Click **"Create"**
6. Wait 3-5 minutes for cluster creation

#### Step 3: Setup Database Access
1. Click **"Database Access"** in left menu
2. Click **"+ ADD NEW DATABASE USER"**
3. Username: `moviefy`
4. Password: Click "Autogenerate Secure Password" (save this!)
5. Database User Privileges: "Read and write to any database"
6. Click **"Add User"**

#### Step 4: Setup Network Access
1. Click **"Network Access"** in left menu
2. Click **"+ ADD IP ADDRESS"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"** (0.0.0.0/0)
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Click **"Database"** in left menu
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password

**Example:**
```
mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
```

**Save this connection string!**

---

### Part B: Deploy Backend (Railway)

#### Step 1: Create Railway Account
1. Go to: https://railway.app/
2. Click **"Login"**
3. Sign in with GitHub (recommended)

#### Step 2: Create New Project
1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select your Moviefy repository
5. Or choose **"Empty Project"** and we'll deploy manually

#### Step 3: Deploy Backend
1. Click **"+ New"** → **"Empty Service"**
2. Click on the service
3. Go to **"Settings"**
4. Click **"Generate Domain"** (you'll get a URL like: `moviefy-backend.up.railway.app`)

#### Step 4: Add Environment Variables
1. Go to **"Variables"** tab
2. Add these variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://moviefy:PASSWORD@cluster0.xxxxx.mongodb.net/moviefy
JWT_SECRET=your_secure_random_string_here_change_this
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:** Replace with your actual values!

#### Step 5: Deploy Code
**Option A: GitHub (Recommended)**
1. Push your backend code to GitHub
2. Railway will auto-deploy

**Option B: Railway CLI**
```bash
npm install -g @railway/cli
railway login
cd backend
railway up
```

#### Step 6: Get Backend URL
- Your backend will be at: `https://moviefy-backend.up.railway.app`
- Save this URL!

---

### Part C: Deploy Frontend (Vercel)

#### Step 1: Create Vercel Account
1. Go to: https://vercel.com/signup
2. Sign up with GitHub (recommended)

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Or click **"Deploy"** and drag your project folder

#### Step 3: Configure Build Settings
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://moviefy-abc123.vercel.app`

#### Step 6: Update Google Console
1. Go back to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth Client ID
3. Add your Vercel URL to:
   - Authorized JavaScript origins: `https://moviefy-abc123.vercel.app`
   - Authorized redirect URIs: `https://moviefy-abc123.vercel.app`
4. Click **"SAVE"**

---

### Part D: Connect Everything

#### Step 1: Update Frontend API URL
Edit `src/services/api.js`:

```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

Add to Vercel environment variables:
```env
VITE_API_URL=https://moviefy-backend.up.railway.app/api
```

#### Step 2: Update Backend CORS
Your backend already has:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
```

Make sure Railway has:
```env
FRONTEND_URL=https://moviefy-abc123.vercel.app
```

#### Step 3: Redeploy
- Vercel: Automatic on git push
- Railway: Automatic on git push

---

## 🎉 You're Live!

### Your URLs:
- **Frontend**: https://moviefy-abc123.vercel.app
- **Backend**: https://moviefy-backend.up.railway.app
- **Database**: MongoDB Atlas (cloud)

### Access From:
- ✅ Your computer
- ✅ Your phone
- ✅ Friend's computer
- ✅ Anywhere in the world!

---

## 📱 Test on Mobile

1. Open your phone browser
2. Go to: `https://moviefy-abc123.vercel.app`
3. Login with Google
4. ✅ Works perfectly!

---

## 🔧 Alternative: Local Network Access (Quick Test)

### Access from Phone on Same WiFi:

#### Step 1: Get Your Computer's IP
```powershell
ipconfig
```
Look for: `IPv4 Address: 192.168.x.x`

#### Step 2: Start Servers with Host Flag
```bash
# Frontend
npm run dev -- --host

# Backend (in backend folder)
npm run dev
```

#### Step 3: Access from Phone
- Frontend: `http://192.168.x.x:5173`
- Make sure phone is on same WiFi

**Note:** This only works on same network, not from anywhere.

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Testing):
- **Vercel**: Free (100GB bandwidth/month)
- **Railway**: Free ($5 credit/month)
- **MongoDB Atlas**: Free (512MB storage)
- **Total**: $0/month

### Paid Tier (For Production):
- **Vercel Pro**: $20/month (unlimited)
- **Railway**: $5-20/month (usage-based)
- **MongoDB Atlas**: $9/month (2GB)
- **Total**: ~$34-49/month

---

## 🎯 Deployment Checklist

### Before Deploying:
- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Railway account created
- [ ] Vercel account created
- [ ] Google OAuth configured
- [ ] Code pushed to GitHub (recommended)

### After Deploying:
- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Environment variables set
- [ ] Google OAuth updated with production URLs
- [ ] Tested login from phone
- [ ] Tested all features work

---

## 🔐 Security for Production

### Update These:

**backend/.env:**
```env
JWT_SECRET=use_a_very_long_random_string_here_at_least_32_characters
MONGODB_URI=mongodb+srv://... (from Atlas)
FRONTEND_URL=https://your-vercel-url.vercel.app
```

**Frontend .env:**
```env
VITE_GOOGLE_CLIENT_ID=your_real_client_id
VITE_API_URL=https://your-railway-url.up.railway.app/api
```

---

## 📊 Deployment Architecture

```
User's Phone/Computer
        ↓
https://moviefy.vercel.app (Frontend)
        ↓
https://moviefy-backend.railway.app (Backend API)
        ↓
MongoDB Atlas (Database - Cloud)
```

**Everything in the cloud!**
- ✅ No local servers needed
- ✅ Access from anywhere
- ✅ Always online
- ✅ Automatic scaling

---

## 🚀 Quick Deploy Commands

### If Using GitHub:

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/moviefy.git
git push -u origin main

# Then deploy via Vercel/Railway dashboards
```

---

## 🎓 Video Tutorials

### Vercel Deployment:
- https://www.youtube.com/watch?v=2HBIzEx6IZA

### Railway Deployment:
- https://www.youtube.com/watch?v=3HNyXCPDQ7Q

### MongoDB Atlas:
- https://www.youtube.com/watch?v=rPqRyYJmx2g

---

## 💡 Pro Tips

1. **Use GitHub**: Automatic deployments on push
2. **Custom Domain**: Buy domain and connect to Vercel
3. **Environment Variables**: Never commit .env files
4. **Monitoring**: Use Vercel/Railway dashboards
5. **Logs**: Check deployment logs for errors

---

## 🆘 Need Help?

### Common Issues:

**"Cannot connect to backend"**
- Check Railway deployment logs
- Verify CORS settings
- Check environment variables

**"Google login not working"**
- Update Google Console with production URLs
- Check Client ID in Vercel env vars
- Clear browser cache

**"Database connection failed"**
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string
- Check username/password

---

## ✅ Success Checklist

Your app is fully deployed when:
- [ ] Can access frontend from phone
- [ ] Can login with Google
- [ ] Can create account
- [ ] Data persists after closing browser
- [ ] Can access from friend's computer
- [ ] All features work
- [ ] No "localhost" in any URLs

---

## 🎉 Congratulations!

Once deployed, your app will be:
- ✅ Accessible from anywhere
- ✅ Always online (24/7)
- ✅ No need to run servers
- ✅ Professional and scalable
- ✅ Free (on free tiers)

---

**Ready to deploy? Follow the steps above!** 🚀
