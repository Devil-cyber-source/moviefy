# 🔧 Fix "Access blocked: Authorization Error"

## 🎯 The Problem

Error: **"Access blocked: Authorization Error"**

This means your Google OAuth Client ID is not properly configured.

---

## ✅ Complete Fix (5 minutes)

### Step 1: Go to Google Cloud Console

🔗 https://console.cloud.google.com/apis/credentials

### Step 2: Find Your OAuth Client ID

Look for: `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8`

**If you DON'T see it:**
- The Client ID might be from a different project
- You might need to create a new one (see Step 6 below)

**If you DO see it:**
- Continue to Step 3

---

### Step 3: Click Edit (pencil icon)

### Step 4: Add Authorized JavaScript Origins

Under "Authorized JavaScript origins", click "ADD URI" and add:

```
http://localhost:5173
```

**Important:**
- Use `http://` (not `https://`)
- Use `localhost` (not `127.0.0.1`)
- Use exact port `5173`
- No trailing slash

### Step 5: Save

Click "Save" button at the bottom

---

### Step 6: Configure OAuth Consent Screen

This is the MOST IMPORTANT part!

1. Click "OAuth consent screen" in the left menu
2. If not configured, click "CONFIGURE CONSENT SCREEN"

**Choose User Type:**
- Select "External"
- Click "CREATE"

**Fill in App Information:**
- App name: `Moviefy`
- User support email: Your email
- Developer contact: Your email
- Click "SAVE AND CONTINUE"

**Scopes:**
- Click "ADD OR REMOVE SCOPES"
- Select these scopes:
  - `userinfo.email`
  - `userinfo.profile`
  - `openid`
- Click "UPDATE"
- Click "SAVE AND CONTINUE"

**Test Users (IMPORTANT!):**
- Click "ADD USERS"
- Add your Gmail address
- Click "ADD"
- Click "SAVE AND CONTINUE"

**Summary:**
- Review and click "BACK TO DASHBOARD"

---

### Step 7: Publish App (Optional but Recommended)

1. On OAuth consent screen page
2. Click "PUBLISH APP"
3. Click "CONFIRM"

**Note:** If you don't publish, only test users can login!

---

### Step 8: Wait & Test

1. Wait 5 minutes for changes to propagate
2. Go to: http://localhost:5173/login
3. Click "Continue with Google"
4. ✅ Should work now!

---

## 🎯 Alternative: Create New Client ID

If the existing Client ID doesn't work, create a new one:

### Step 1: Go to Credentials

🔗 https://console.cloud.google.com/apis/credentials

### Step 2: Create OAuth Client ID

1. Click "CREATE CREDENTIALS"
2. Choose "OAuth client ID"
3. Application type: "Web application"
4. Name: `Moviefy Local`

### Step 3: Add Authorized Origins

Under "Authorized JavaScript origins", add:
```
http://localhost:5173
```

### Step 4: Create

Click "CREATE"

### Step 5: Copy Client ID

You'll see your new Client ID like:
```
123456789-abcdefghijk.apps.googleusercontent.com
```

**Copy it!**

### Step 6: Update .env File

Open your `.env` file and update:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
```

### Step 7: Restart Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 8: Test

Go to: http://localhost:5173/login
Click "Continue with Google"
✅ Should work!

---

## 🔍 Why This Error Happens

**"Access blocked: Authorization Error"** means:

1. ❌ OAuth consent screen not configured
2. ❌ Your email not added as test user
3. ❌ App not published (and you're not a test user)
4. ❌ Authorized origins not configured
5. ❌ Client ID is invalid or deleted

---

## 📋 Checklist

Make sure you've done ALL of these:

- [ ] OAuth consent screen configured
- [ ] App name set to "Moviefy"
- [ ] Scopes added (email, profile, openid)
- [ ] Your email added as test user
- [ ] App published (or you're a test user)
- [ ] Authorized origins added: `http://localhost:5173`
- [ ] Waited 5 minutes after changes
- [ ] Restarted dev server
- [ ] Cleared browser cache

---

## 🎯 Quick Test

After fixing, test with this:

1. Open: http://localhost:5173/login
2. Click "Continue with Google"
3. You should see Google account selection
4. Select your account
5. Click "Allow"
6. ✅ You're logged in!

---

## 🆘 Still Getting Error?

### Error: "Access blocked: This app's request is invalid"
**Fix:** Configure OAuth consent screen (Step 6 above)

### Error: "Access blocked: Moviefy has not completed the Google verification process"
**Fix:** Add your email as test user OR publish the app

### Error: "redirect_uri_mismatch"
**Fix:** Add `http://localhost:5173` to authorized origins

### Error: "invalid_client"
**Fix:** Client ID is wrong, create a new one

---

## 💡 Pro Tip

**For development:**
- Add your email as test user
- Don't need to publish app
- Works immediately

**For production:**
- Publish the app
- Anyone can login
- Takes 1-2 days for Google review (but works immediately in testing mode)

---

## 🚀 Alternative: Use Demo Mode

If Google OAuth is too complicated, the app works perfectly without it!

**Demo accounts:**
- Email: `admin@moviefy.com` / Password: `admin123`
- Email: `user@moviefy.com` / Password: `user123`

All features work without Google OAuth!

---

## 📸 Visual Guide

### What OAuth Consent Screen Should Look Like:

```
OAuth consent screen
├── User Type: External
├── App name: Moviefy
├── User support email: your@email.com
├── Scopes: email, profile, openid
├── Test users: your@email.com
└── Publishing status: Testing (or Published)
```

### What Credentials Should Look Like:

```
OAuth 2.0 Client IDs
├── Name: Moviefy Local
├── Client ID: 123456789-abc.apps.googleusercontent.com
├── Authorized JavaScript origins:
│   └── http://localhost:5173
└── Authorized redirect URIs: (leave empty)
```

---

**Follow these steps and it will work!** 🚀

**Need more help? Tell me which step you're stuck on!** 💬
