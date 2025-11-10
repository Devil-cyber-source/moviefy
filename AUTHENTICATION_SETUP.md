# 🔐 Real Authentication Setup Guide

Your app currently has demo mode fallbacks. Follow these steps to enable real authentication.

---

## 1️⃣ Google OAuth Login

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project:**
   - Click "Select a project" → "New Project"
   - Name: "Moviefy"
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Moviefy Web Client"
   
5. **Add Authorized URLs:**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:5173
     https://moviefy-net.up.railway.app
     ```
   
   - **Authorized redirect URIs:**
     ```
     http://localhost:5173
     https://moviefy-net.up.railway.app
     ```

6. **Copy Your Client ID:**
   - It looks like: `123456789-abcdefg.apps.googleusercontent.com`

### Step 2: Add to Your App

**Local Development (.env):**
```bash
# frontend/.env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000
```

**Railway Deployment:**
1. Go to Frontend service → Variables
2. Add:
   ```
   VITE_GOOGLE_CLIENT_ID = YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
   ```
3. Redeploy frontend

### Step 3: Test Google Login
- Click "Continue with Google"
- Should open real Google login popup
- After login, you'll be authenticated!

---

## 2️⃣ Phone OTP Login (Using Twilio)

### Option A: Twilio (Recommended - Free Trial)

#### Step 1: Create Twilio Account
1. Go to: https://www.twilio.com/try-twilio
2. Sign up (free trial gives $15 credit)
3. Verify your phone number

#### Step 2: Get Credentials
1. Go to Twilio Console: https://console.twilio.com/
2. Copy:
   - **Account SID**
   - **Auth Token**
3. Go to "Phone Numbers" → Get a Twilio phone number

#### Step 3: Add to Backend
```bash
# backend/.env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

#### Step 4: Install Twilio SDK
```bash
cd backend
npm install twilio
```

#### Step 5: Update Backend Code
I'll create the phone auth route for you (see below).

---

### Option B: Firebase Phone Auth (Alternative)

#### Step 1: Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Create new project: "Moviefy"
3. Go to "Authentication" → "Sign-in method"
4. Enable "Phone" authentication

#### Step 2: Get Config
1. Go to Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy the config object

#### Step 3: Add to Frontend
```bash
# frontend/.env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 3️⃣ Email/Password Login

**Already working!** Your MongoDB backend handles this.

To test:
1. Go to Signup page
2. Enter email and password
3. Click "Sign Up"
4. Login with same credentials

---

## 🚀 Quick Setup (Recommended Order)

### For Development (Local):
1. ✅ **Email/Password** - Already works!
2. ✅ **Google OAuth** - 10 minutes setup
3. ⏳ **Phone OTP** - 20 minutes setup (optional)

### For Production (Railway):
1. Add `VITE_GOOGLE_CLIENT_ID` to frontend variables
2. Add Twilio credentials to backend variables (if using phone auth)
3. Redeploy both services

---

## 📋 Current Status

### ✅ Working Now:
- Email/Password registration and login
- MongoDB user storage
- JWT authentication
- Password hashing with bcrypt

### ⏳ Needs Setup:
- Google OAuth (just need Client ID)
- Phone OTP (need Twilio or Firebase)

### 🎯 Demo Mode Fallback:
Your app currently falls back to demo mode if:
- Google OAuth not configured
- Phone auth not configured
- Backend not connected

This is good for development but should be removed for production!

---

## 🔧 Remove Demo Mode (After Setup)

Once you've configured real auth, you can remove demo fallbacks:

1. **In AuthContext.jsx:**
   - Remove the `catch` blocks that create demo users
   - Make authentication fail properly instead of falling back

2. **In Login/Signup pages:**
   - Remove demo mode messages
   - Show proper error messages

---

## 🆘 Need Help?

**Google OAuth Issues:**
- Make sure redirect URIs match exactly
- Check browser console for errors
- Verify Client ID is correct

**Phone OTP Issues:**
- Check Twilio credits
- Verify phone number format (+1234567890)
- Check backend logs for errors

**General Auth Issues:**
- Check backend is running
- Verify JWT_SECRET is set
- Check MongoDB connection

---

## 📱 Testing Checklist

After setup, test:
- [ ] Email/Password signup
- [ ] Email/Password login
- [ ] Google OAuth login
- [ ] Phone OTP login
- [ ] Logout
- [ ] Protected routes (profile, admin)
- [ ] Token persistence (refresh page)

---

**Want me to help you set up any of these? Let me know which one you want to start with!** 🚀
