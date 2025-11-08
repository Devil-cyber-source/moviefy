# 🔧 Fix Google OAuth - Step by Step

## Problem
Your Google Client ID is configured but not working because it's missing authorized origins.

## Solution (5 minutes)

### Step 1: Go to Google Cloud Console
🔗 **Open:** https://console.cloud.google.com/apis/credentials

### Step 2: Find Your Client ID
Look for: `652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8`

**If you see it:**
- Click the pencil icon (Edit)
- Go to Step 3

**If you DON'T see it:**
- Click "Create Credentials" → "OAuth Client ID"
- Application type: "Web application"
- Name: "Moviefy Local"
- Go to Step 3

### Step 3: Add Authorized Origins
Under "Authorized JavaScript origins", click "ADD URI" and add:

```
http://localhost:5173
```

**Important:** 
- No trailing slash
- Must be exactly `http://localhost:5173`
- NOT `https://` (use `http://` for local)

### Step 4: Save
- Click "Save" button
- Wait 5 minutes (Google needs time to update)

### Step 5: Copy Client ID
- Copy the full Client ID (looks like: `123456-abc.apps.googleusercontent.com`)

### Step 6: Update .env File
Open your `.env` file and update:

```env
VITE_GOOGLE_CLIENT_ID=paste_your_new_client_id_here
```

### Step 7: Restart Frontend
```bash
# Stop current server (Ctrl+C)
# Then run:
npm run dev
```

### Step 8: Test
1. Go to: http://localhost:5173/login
2. Click "Continue with Google"
3. ✅ Google popup should appear!
4. ✅ Login with your Google account
5. ✅ You should be logged in!

---

## Still Not Working?

### Check These:

**1. Popup Blocked?**
- Allow popups for localhost:5173
- Check browser address bar for popup icon

**2. Wrong Origin?**
- Make sure you added `http://localhost:5173` (not https)
- No trailing slash

**3. Client ID Wrong?**
- Check .env file
- Make sure it ends with `.apps.googleusercontent.com`
- No spaces or quotes

**4. Need to Wait?**
- Google changes take 5-10 minutes to propagate
- Try again after waiting

**5. Browser Cache?**
- Hard refresh: Ctrl+Shift+R
- Or try incognito mode

---

## Quick Test

I created a test file for you: `test-google-login.html`

**To test:**
1. Open `test-google-login.html` in browser
2. Click "Test Google Login"
3. If it works here, it should work in your app!

---

## What You Should See

### ✅ Success:
- Google popup opens
- Shows your Google accounts
- You can select an account
- Popup closes
- You're logged in!

### ❌ Error Messages:

**"Popup blocked"**
→ Allow popups in browser settings

**"redirect_uri_mismatch"**
→ Add `http://localhost:5173` to authorized origins

**"invalid_client"**
→ Client ID is wrong, check .env file

**"access_denied"**
→ You clicked "Cancel" in Google popup

---

## Need Help?

**Show me:**
1. Screenshot of Google Cloud Console credentials page
2. Error message in browser console (F12)
3. Your .env file (hide the full Client ID if sharing)

---

## Alternative: Use Demo Mode

If you just want to test the app without Google:

**Use these demo accounts:**
- Email: `admin@moviefy.com` / Password: `admin123`
- Email: `user@moviefy.com` / Password: `user123`

Google OAuth is optional - the app works fine without it!

---

**Let me know if you need help with any step!** 🚀
