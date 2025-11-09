# ⚡ RUN THIS - Fastest Deployment

## 🎯 I've Automated Everything!

Just follow these 3 steps:

---

## Step 1: Create Accounts (5 min)

### MongoDB Atlas:
🔗 https://www.mongodb.com/cloud/atlas/register
- Sign up with Google
- Create free cluster
- Create user: `moviefy`
- Copy connection string
- **SAVE IT!**

### Railway:
🔗 https://railway.app/
- Sign in with GitHub

### Vercel:
🔗 https://vercel.com/signup
- Sign up with GitHub

---

## Step 2: Create GitHub Repo (1 min)

🔗 https://github.com/new
- Name: `moviefy`
- Create!

Then run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/moviefy.git
git branch -M main
git push -u origin main
```

---

## Step 3: Run My Script (3 min)

```powershell
powershell -ExecutionPolicy Bypass -File deploy-all.ps1
```

**Follow the prompts!**

---

## 🎉 Done!

Your app will be live at:
```
https://moviefy-xxx.vercel.app
```

---

## 📝 After Script Runs

Go to: https://vercel.com/dashboard
- Click your project
- Settings → Environment Variables
- Add:
  - `VITE_API_URL` = (your Railway URL + /api)
  - `VITE_GOOGLE_CLIENT_ID` = `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com`
- Redeploy

---

**Total Time: 10 minutes**
**Total Cost: $0**

**Questions? Check `AUTOMATED_DEPLOYMENT.md` for details!**
