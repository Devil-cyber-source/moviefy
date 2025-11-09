# 🔐 Login Troubleshooting Guide

## 🐛 Current Issues

You're experiencing:
1. ❌ Only admin login works
2. ❌ Other users can't login
3. ❌ Google login not working

---

## 🔍 Quick Diagnosis

### Step 1: Test Backend API Directly

Open this file in your browser:
```
test-login.html
```

Or open: http://localhost:5173/test-login.html

This will test if the backend API is working.

**Expected Result:**
- ✅ "LOGIN SUCCESSFUL" message
- ✅ Shows user data
- ✅ Shows token

**If it fails:**
- Backend is not running
- CORS issue
- MongoDB not connected

---

### Step 2: Check Browser Console

1. Open your app: http://localhost:5173
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to login
5. Look for error messages

**What to look for:**
- 🔴 Red error messages
- ⚠️ Yellow warnings
- 🔵 Blue log messages (I added these)

**You should see:**
```
🔐 Attempting login for: admin@moviefy.com
✅ Login response: {success: true, ...}
✅ User logged in: Admin User
```

**If you see:**
```
❌ API login error: ...
⚠️ Falling back to demo mode
```
This means the API call is failing.

---

## 🔧 Common Issues & Fixes

### Issue 1: CORS Error

**Symptoms:**
- Console shows: "CORS policy blocked"
- Login fails immediately
- Network tab shows failed requests

**Fix:**
1. Check backend is running
2. Verify CORS settings in `backend/server.js`
3. Restart backend:
   ```bash
   cd backend
   npm run dev
   ```

---

### Issue 2: Backend Not Running

**Symptoms:**
- Console shows: "Failed to fetch"
- Network error
- Connection refused

**Fix:**
1. Check if backend is running:
   ```bash
   # Should show: Server running on http://localhost:5000
   ```

2. If not running, start it:
   ```bash
   cd backend
   npm run dev
   ```

3. Verify it's working:
   - Open: http://localhost:5000/api/health
   - Should show: `{"status":"ok","database":"MongoDB"}`

---

### Issue 3: MongoDB Not Connected

**Symptoms:**
- Backend shows: "MongoDB connection error"
- Login works for admin only
- New users can't be created

**Fix:**
1. Check MongoDB service:
   ```powershell
   Get-Service -Name MongoDB
   ```

2. If not running, start it:
   ```powershell
   net start MongoDB
   ```

3. Restart backend after MongoDB starts

---

### Issue 4: Wrong API URL

**Symptoms:**
- All logins fail
- Console shows 404 errors
- Network tab shows wrong URLs

**Fix:**
Check `src/services/api.js`:
```javascript
export const API_URL = 'http://localhost:5000/api';
```

Should be exactly this URL.

---

### Issue 5: Google Login Not Configured

**Symptoms:**
- Google login button doesn't work
- No popup appears
- Console shows: "google_not_configured"

**This is NORMAL!**
- Google login is in demo mode
- It should still work (creates demo account)
- To enable real Google OAuth, see `GOOGLE_OAUTH_SETUP.md`

**Current Behavior:**
- Click "Continue with Google"
- Should create demo account automatically
- If not working, check console for errors

---

## 🧪 Testing Steps

### Test 1: Backend Health
```bash
# Open in browser or use curl
http://localhost:5000/api/health
```

**Expected:**
```json
{
  "status": "ok",
  "database": "MongoDB",
  "users": 3
}
```

---

### Test 2: Direct API Login
```bash
# PowerShell
$body = @{email='admin@moviefy.com';password='admin123'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method POST -Body $body -ContentType 'application/json'
```

**Expected:**
```
success : True
token   : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
user    : @{name=Admin User; email=admin@moviefy.com; ...}
```

---

### Test 3: Create New User
```bash
# PowerShell
$body = @{
    name='Test User'
    email='test@test.com'
    password='test123456'
} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method POST -Body $body -ContentType 'application/json'
```

**Expected:**
```
success : True
token   : ...
user    : @{name=Test User; ...}
```

---

### Test 4: Frontend Login

1. Open: http://localhost:5173/login
2. Open Console (F12)
3. Enter credentials
4. Click "Sign In"
5. Watch console for logs

**Expected Console Output:**
```
🔐 Attempting login for: admin@moviefy.com
✅ Login response: {success: true, ...}
✅ User logged in: Admin User
```

---

## 📊 Debug Checklist

Run through this checklist:

- [ ] Backend running (http://localhost:5000)
- [ ] MongoDB service running
- [ ] Backend shows "MongoDB connected"
- [ ] Health endpoint works
- [ ] Direct API login works
- [ ] Frontend running (http://localhost:5173)
- [ ] Browser console open (F12)
- [ ] No CORS errors in console
- [ ] No network errors in console
- [ ] Can see login attempt logs

---

## 🔍 What to Check in Browser

### Network Tab (F12 → Network):
1. Try to login
2. Look for request to: `http://localhost:5000/api/auth/login`
3. Check:
   - Status: Should be 200
   - Response: Should have `success: true`
   - Headers: Should have CORS headers

### Console Tab (F12 → Console):
1. Should see my debug logs:
   - 🔐 Attempting login
   - ✅ Login response
   - ✅ User logged in

2. If you see:
   - ❌ API login error
   - ⚠️ Falling back to demo mode
   
   This means API call failed. Check Network tab for why.

---

## 🚀 Quick Fixes

### Fix 1: Restart Everything
```bash
# Stop both servers (Ctrl+C)

# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd ..
npm run dev
```

### Fix 2: Clear Browser Cache
```
Ctrl + Shift + Delete
Clear cache
Refresh page (Ctrl + Shift + R)
```

### Fix 3: Check Ports
```powershell
# Check if ports are in use
netstat -ano | findstr :5173
netstat -ano | findstr :5000
```

### Fix 4: Verify MongoDB
```powershell
# Check service
Get-Service -Name MongoDB

# Start if needed
net start MongoDB
```

---

## 📞 Get Detailed Error Info

### In Browser Console, run:
```javascript
// Test API directly
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('Health:', d))
  .catch(e => console.error('Error:', e))

// Test login
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email:'admin@moviefy.com',password:'admin123'})
})
  .then(r => r.json())
  .then(d => console.log('Login:', d))
  .catch(e => console.error('Error:', e))
```

---

## 🎯 Expected Behavior

### Admin Login:
- Email: admin@moviefy.com
- Password: admin123
- Should: ✅ Login successfully
- Redirect to: Admin dashboard

### New User Signup:
- Fill signup form
- Click "Sign Up"
- Should: ✅ Create account in MongoDB
- Should: ✅ Login automatically
- Redirect to: Home page

### Google Login (Demo Mode):
- Click "Continue with Google"
- Should: ✅ Create demo account
- Should: ✅ Login automatically
- Redirect to: Home page

### Phone Login:
- Enter phone number
- OTP: 123456
- Should: ✅ Create account
- Should: ✅ Login automatically
- Redirect to: Home page

---

## 🆘 Still Not Working?

### Share This Info:

1. **Backend Status:**
   - Is it running? (yes/no)
   - MongoDB connected? (yes/no)
   - Health endpoint works? (yes/no)

2. **Browser Console Errors:**
   - Copy any red error messages
   - Copy the full error text

3. **Network Tab:**
   - Status code of login request
   - Response body
   - Any CORS errors?

4. **What Happens:**
   - Describe exactly what happens when you try to login
   - Does page reload?
   - Any error message shown?
   - Where does it fail?

---

**Open test-login.html in your browser to test the API directly!**
