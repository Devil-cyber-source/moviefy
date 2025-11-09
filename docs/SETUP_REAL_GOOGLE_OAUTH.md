# 🔐 Setup Real Google OAuth - Step by Step

## 📋 Prerequisites
- Google Account
- 10 minutes of time

---

## 🚀 Step-by-Step Setup

### Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Sign in with your Google account

---

### Step 2: Create a New Project

1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"NEW PROJECT"**
3. Enter project details:
   - **Project name**: `Moviefy`
   - **Organization**: Leave as default
4. Click **"CREATE"**
5. Wait 10-20 seconds for project creation
6. Select your new project from the dropdown

---

### Step 3: Enable Google+ API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for: `Google+ API`
3. Click on **"Google+ API"**
4. Click **"ENABLE"**
5. Wait for it to enable (5-10 seconds)

---

### Step 4: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (for testing with any Google account)
3. Click **"CREATE"**

**Fill in the form:**

**App Information:**
- App name: `Moviefy`
- User support email: Your email
- App logo: (Optional - skip for now)

**App Domain:**
- Application home page: `http://localhost:5173`
- (Leave others blank for now)

**Developer contact:**
- Email addresses: Your email

4. Click **"SAVE AND CONTINUE"**

**Scopes:**
- Click **"ADD OR REMOVE SCOPES"**
- Select:
  - `userinfo.email`
  - `userinfo.profile`
  - `openid`
- Click **"UPDATE"**
- Click **"SAVE AND CONTINUE"**

**Test Users:**
- Click **"ADD USERS"**
- Add your email address
- Click **"ADD"**
- Click **"SAVE AND CONTINUE"**

5. Click **"BACK TO DASHBOARD"**

---

### Step 5: Create OAuth Client ID

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**

**Configure:**
- Application type: **"Web application"**
- Name: `Moviefy Web Client`

**Authorized JavaScript origins:**
- Click **"+ ADD URI"**
- Add: `http://localhost:5173`
- Click **"+ ADD URI"** again
- Add: `http://localhost:3000` (backup)

**Authorized redirect URIs:**
- Click **"+ ADD URI"**
- Add: `http://localhost:5173`
- Click **"+ ADD URI"** again
- Add: `http://localhost:3000` (backup)

4. Click **"CREATE"**

---

### Step 6: Copy Your Client ID

You'll see a popup with:
- **Client ID**: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Client secret**: (you don't need this for frontend)

**IMPORTANT:** Copy the **Client ID** - you'll need it in the next step!

---

### Step 7: Add Client ID to Your App

1. Open your project folder
2. Open the `.env` file (in the root directory)
3. Replace the empty value with your Client ID:

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

**Example:**
```env
# Before
VITE_GOOGLE_CLIENT_ID=

# After
VITE_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

4. **Save the file**

---

### Step 8: Restart Your Frontend

**Stop the current server:**
- Press `Ctrl + C` in the terminal running frontend

**Start it again:**
```bash
npm run dev
```

**You should see:**
```
VITE v5.4.21  ready in 623 ms
➜  Local:   http://localhost:5173/
```

---

### Step 9: Test Real Google Login!

1. Open: http://localhost:5173/login
2. Click **"Continue with Google"**
3. **Google popup should appear!**
4. Select your Google account
5. Click **"Continue"** to grant permissions
6. ✅ You're logged in with your real Google account!

---

## 🎉 Success Indicators

### You'll Know It's Working When:
- ✅ Google popup window appears
- ✅ Shows "Sign in with Google" screen
- ✅ Lists your Google accounts
- ✅ After selecting account, you're logged in
- ✅ Your real Google name and email appear in profile

---

## 🐛 Troubleshooting

### Issue: "redirect_uri_mismatch"
**Solution:**
- Go back to Google Console → Credentials
- Edit your OAuth Client ID
- Make sure `http://localhost:5173` is in **Authorized JavaScript origins**
- Save and try again

### Issue: "Access blocked: This app's request is invalid"
**Solution:**
- Make sure you enabled Google+ API
- Check OAuth consent screen is configured
- Add yourself as a test user

### Issue: Popup doesn't appear
**Solution:**
- Check if popup was blocked by browser
- Allow popups for localhost
- Try different browser

### Issue: "Invalid client"
**Solution:**
- Double-check Client ID in `.env` file
- Make sure it starts with `VITE_`
- No extra spaces or quotes
- Restart frontend after changing

---

## 📊 Before vs After

### Before (Demo Mode):
- Creates fake Google accounts
- Email: google.user.123@gmail.com
- No real Google integration

### After (Real OAuth):
- ✅ Real Google popup
- ✅ Your actual Google account
- ✅ Real name and email
- ✅ Real profile picture
- ✅ Secure OAuth 2.0

---

## 🔒 Security Notes

### For Development:
- ✅ Using localhost is safe
- ✅ Client ID can be public
- ✅ Only you can test (test user)

### For Production:
- Add production domain to authorized origins
- Verify OAuth consent screen
- Remove test mode
- Use HTTPS only

---

## 📝 Quick Reference

### Your Credentials Location:
- Google Console: https://console.cloud.google.com/apis/credentials
- Your `.env` file: `C:\Users\aksha\OneDrive\Desktop\moviefy\.env`

### Important URLs:
- Google Console: https://console.cloud.google.com/
- OAuth Consent: https://console.cloud.google.com/apis/credentials/consent
- Credentials: https://console.cloud.google.com/apis/credentials

---

## ✅ Checklist

Before testing, make sure:
- [ ] Created Google Cloud project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Created OAuth Client ID
- [ ] Added localhost:5173 to authorized origins
- [ ] Copied Client ID
- [ ] Updated `.env` file
- [ ] Restarted frontend server
- [ ] Allowed popups in browser

---

## 🎯 Next Steps

After Google OAuth is working:
1. ✅ Test login with your Google account
2. ✅ Test signup with Google
3. ✅ Check profile shows your real info
4. ✅ Ready for production deployment!

---

**Follow these steps and you'll have real Google login working in 10 minutes!** 🚀
