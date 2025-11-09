# ⚡ Quick Fix: "Access blocked: Authorization Error"

## 🎯 The Issue

You're seeing: **"Access blocked: Authorization Error"**

**Reason:** OAuth consent screen is not configured properly.

---

## ✅ 3-Minute Fix

### 1. Configure OAuth Consent Screen (2 min)

🔗 Go to: https://console.cloud.google.com/apis/credentials/consent

**Fill in:**
- User Type: **External** → CREATE
- App name: **Moviefy**
- User support email: **Your email**
- Developer email: **Your email**
- Click **SAVE AND CONTINUE**

**Scopes:**
- Click **ADD OR REMOVE SCOPES**
- Check: `userinfo.email`, `userinfo.profile`, `openid`
- Click **UPDATE**
- Click **SAVE AND CONTINUE**

**Test Users:**
- Click **ADD USERS**
- Enter your Gmail address
- Click **ADD**
- Click **SAVE AND CONTINUE**

**Done!** Click **BACK TO DASHBOARD**

---

### 2. Add Authorized Origin (1 min)

🔗 Go to: https://console.cloud.google.com/apis/credentials

- Find your Client ID
- Click Edit (pencil icon)
- Under "Authorized JavaScript origins", add:
  ```
  http://localhost:5173
  ```
- Click **SAVE**

---

### 3. Test (30 seconds)

1. Wait 2 minutes
2. Go to: http://localhost:5173/login
3. Click "Continue with Google"
4. ✅ Works!

---

## 🎯 That's It!

The main issue was: **OAuth consent screen not configured**

Now it should work!

---

## 🆘 Still Not Working?

### Option 1: Create New Client ID

The existing Client ID might be broken. Create a new one:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. Type: "Web application"
4. Name: "Moviefy Local"
5. Add origin: `http://localhost:5173`
6. Click "CREATE"
7. Copy the new Client ID
8. Update `.env` file:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_new_client_id_here
   ```
9. Restart server: `npm run dev`
10. Test again!

---

### Option 2: Use Demo Mode

Google OAuth is optional! Use demo accounts:
- `admin@moviefy.com` / `admin123`
- `user@moviefy.com` / `user123`

---

## 📚 Detailed Guide

For complete step-by-step instructions, see:
- **FIX_ACCESS_BLOCKED.md** ← Full guide with screenshots

---

**Follow the 3-minute fix above and it will work!** 🚀
