# 🔧 Google OAuth Error - Complete Fix Guide

## 🎯 Common Google OAuth Errors & Solutions

### Error 1: "redirect_uri_mismatch"

**Why it happens:**
- Your app's URL is not added to Google Console authorized origins

**Fix:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your Client ID: `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8`
3. Click Edit (pencil icon)
4. Under "Authorized JavaScript origins", add:
   ```
   http://localhost:5173
   ```
5. Click "Save"
6. Wait 5 minutes
7. Try again

---

### Error 2: "popup_closed_by_user"

**Why it happens:**
- You clicked Cancel in the Google popup
- OR popup was blocked by browser

**Fix:**
1. Allow popups for localhost:5173
2. Try Google login again
3. Don't close the popup manually

---

### Error 3: "invalid_client"

**Why it happens:**
- Client ID is wrong or doesn't exist

**Fix:**
1. Check your `.env` file
2. Make sure Client ID is correct
3. No spaces or quotes around it
4. Should end with `.apps.googleusercontent.com`

---

### Error 4: Popup Blocked

**Why it happens:**
- Browser is blocking popups

**Fix:**

**Chrome:**
1. Click the popup icon in address bar
2. Allow popups for localhost:5173

**Firefox:**
1. Click the shield icon
2. Allow popups

**Edge:**
1. Click the popup icon
2. Always allow popups for this site

---

### Error 5: "access_denied"

**Why it happens:**
- You denied permission in Google popup
- OR Google account has restrictions

**Fix:**
1. Try again and click "Allow"
2. Make sure you're using a personal Google account (not work/school)

---

## 🔍 Diagnostic Tool

I've created a diagnostic tool for you!

**Open:** `test-google-oauth.html`

This will:
- ✅ Check if Client ID is configured
- ✅ Check if format is correct
- ✅ Test Google OAuth
- ✅ Show exact error
- ✅ Provide specific fix

---

## 🛠️ Step-by-Step Fix

### Step 1: Verify Client ID

Check your `.env` file:
```env
VITE_GOOGLE_CLIENT_ID=652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

✅ Should be exactly like this (no spaces, no quotes)

### Step 2: Configure Google Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth Client ID
3. Click Edit
4. Add authorized origins:
   - `http://localhost:5173` (for local development)
   - `http://localhost:5174` (backup)
   - Your production URL (when deployed)
5. Save

### Step 3: Wait

Google changes take 5-10 minutes to propagate. Be patient!

### Step 4: Clear Browser Cache

1. Press `Ctrl + Shift + Delete`
2. Clear cached images and files
3. Close and reopen browser

### Step 5: Test

1. Go to: http://localhost:5173/login
2. Click "Continue with Google"
3. Should work now!

---

## 🎯 Quick Fix (Most Common Issue)

**The #1 reason Google OAuth fails:**

❌ **Missing authorized origin in Google Console**

**Fix in 2 minutes:**

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your Client ID
3. Add: `http://localhost:5173`
4. Save
5. Wait 5 minutes
6. Try again

**That's it!** This fixes 90% of Google OAuth issues.

---

## 🧪 Test Your Setup

### Method 1: Use Diagnostic Tool
```
Open: test-google-oauth.html
Click: Test Google OAuth
```

### Method 2: Check Browser Console
1. Open your app: http://localhost:5173/login
2. Press F12 (open DevTools)
3. Click Console tab
4. Click "Continue with Google"
5. Look for error messages

Common console errors:
- `redirect_uri_mismatch` → Add localhost to Google Console
- `popup_blocked` → Allow popups
- `invalid_client` → Check Client ID

---

## 📋 Checklist

Before asking for help, verify:

- [ ] Client ID is in `.env` file
- [ ] Client ID ends with `.apps.googleusercontent.com`
- [ ] No spaces or quotes in `.env`
- [ ] `http://localhost:5173` added to Google Console
- [ ] Waited 5 minutes after Google Console changes
- [ ] Popups are allowed in browser
- [ ] Cleared browser cache
- [ ] Restarted dev server after `.env` changes
- [ ] Using personal Google account (not work/school)

---

## 🔄 Alternative: Use Demo Mode

If Google OAuth is too complicated, the app works fine without it!

**Demo accounts:**
- Email: `admin@moviefy.com` / Password: `admin123`
- Email: `user@moviefy.com` / Password: `user123`

Google OAuth is **optional** - all features work without it!

---

## 🆘 Still Not Working?

### Show me:
1. Screenshot of error message
2. Browser console errors (F12 → Console)
3. Your Google Console authorized origins screenshot

### Or try:
1. Use demo accounts instead
2. Deploy to production (Google OAuth works better on HTTPS)
3. Create a new Client ID

---

## 💡 Why Google OAuth Fails Locally

Google OAuth is designed for production (HTTPS). Local development (HTTP) requires special configuration:

**Requirements for localhost:**
- ✅ Must explicitly add `http://localhost:5173` to authorized origins
- ✅ Must use exact port number
- ✅ Cannot use `127.0.0.1` (use `localhost`)
- ✅ Cannot use IP address

**In production (HTTPS):**
- ✅ Works much better
- ✅ Fewer restrictions
- ✅ More reliable

**Recommendation:** Deploy to Vercel/Railway for best Google OAuth experience!

---

## 🚀 Production Setup

When you deploy, update Google Console:

**Add these authorized origins:**
- `https://your-app.vercel.app` (your Vercel URL)
- `https://your-domain.com` (if you have custom domain)

**Then update `.env.production`:**
```env
VITE_GOOGLE_CLIENT_ID=652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
```

---

**Need help? Tell me what error you see!** 💬
