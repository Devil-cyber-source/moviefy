# ✅ Deployment Checklist

## Before You Start

Make sure you have:
- [ ] MongoDB Atlas account
- [ ] Railway account  
- [ ] Vercel account

---

## Step-by-Step Deployment

### 1️⃣ MongoDB Atlas (Database)

**URL:** https://www.mongodb.com/cloud/atlas/register

- [ ] Created account
- [ ] Created free M0 cluster
- [ ] Created database user (username: `moviefy`)
- [ ] Saved password: `________________`
- [ ] Allowed network access (0.0.0.0/0)
- [ ] Got connection string: `mongodb+srv://...`

**Connection String:**
```
_____________________________________________
```

---

### 2️⃣ Railway (Backend)

**URL:** https://railway.app/

- [ ] Created account
- [ ] Created new project
- [ ] Created empty service
- [ ] Added environment variables:
  - [ ] PORT = 5000
  - [ ] MONGODB_URI = (from step 1)
  - [ ] JWT_SECRET = moviefy_secret_key_12345
  - [ ] FRONTEND_URL = http://localhost:5173 (update later)
- [ ] Deployed backend code
- [ ] Generated domain
- [ ] Deployment successful

**Backend URL:**
```
https://_____________________________.up.railway.app
```

---

### 3️⃣ Vercel (Frontend)

**URL:** https://vercel.com/

- [ ] Created account
- [ ] Updated `.env.production` with Railway URL
- [ ] Built project (`npm run build`)
- [ ] Deployed to Vercel
- [ ] Added environment variables:
  - [ ] VITE_API_URL = (Railway URL + /api)
  - [ ] VITE_GOOGLE_CLIENT_ID = (your client ID)
- [ ] Deployment successful

**Frontend URL:**
```
https://_____________________________.vercel.app
```

---

### 4️⃣ Connect Everything

- [ ] Updated Railway FRONTEND_URL with Vercel URL
- [ ] Redeployed Railway backend
- [ ] Tested frontend can connect to backend

---

## 🧪 Testing

### On Computer:
- [ ] Can access app at Vercel URL
- [ ] Can create account
- [ ] Can login
- [ ] Can browse movies
- [ ] Can add to watchlist

### On Phone:
- [ ] Can access app at Vercel URL
- [ ] Can login
- [ ] All features work

---

## 📝 Save These URLs

**Live App:** `https://_____________________________.vercel.app`

**Backend API:** `https://_____________________________.up.railway.app`

**Database:** MongoDB Atlas (cloud)

---

## 🎉 Success Indicators

Your app is fully deployed when:
- ✅ Can access from any device
- ✅ Can access from phone
- ✅ No localhost URLs anywhere
- ✅ Data persists after closing browser
- ✅ Friends can access your app

---

## 🆘 If Something Goes Wrong

### Backend Issues:
1. Check Railway deployment logs
2. Verify MongoDB connection string
3. Check environment variables

### Frontend Issues:
1. Check Vercel deployment logs
2. Verify API URL is correct
3. Check browser console for errors

### Database Issues:
1. Check MongoDB Atlas IP whitelist
2. Verify username/password
3. Test connection string

---

## 📞 Need Help?

Show me:
1. Which step you're on
2. Any error messages
3. Screenshots if needed

---

**Good luck with deployment!** 🚀
