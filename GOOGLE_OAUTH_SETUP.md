# Google OAuth Setup Guide

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 1.2 Create a New Project (or select existing)
1. Click on the project dropdown at the top
2. Click "New Project"
3. Name it: **Moviefy** (or any name you prefer)
4. Click "Create"

### 1.3 Enable Google+ API
1. Go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and click "Enable"

### 1.4 Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** → **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **Moviefy**
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Scopes: Skip (click Save and Continue)
   - Test users: Add your email (optional)
   - Click **Save and Continue**

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **Moviefy Web Client**
   - Authorized JavaScript origins:
     - http://localhost:5173
     - http://localhost:3000
   - Authorized redirect URIs:
     - http://localhost:5173
     - http://localhost:3000
   - Click **Create**

### 1.5 Copy Your Client ID
You'll see a popup with:
- **Client ID**: `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: (you don't need this for frontend)

**Copy the Client ID** - you'll need it in the next step!

## Step 2: Add Client ID to Your App

### 2.1 Create Environment File
Create a file named `.env` in your project root:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

Replace `YOUR_CLIENT_ID_HERE` with your actual Client ID from Step 1.5

Example:
```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### 2.2 Add .env to .gitignore
Make sure `.env` is in your `.gitignore` file:

```
.env
.env.local
```

## Step 3: Restart Your Dev Server

Stop your current dev server (Ctrl+C) and restart it:

```bash
npm run dev
```

This is necessary for Vite to load the environment variables.

## Step 4: Test Google Login

1. Open http://localhost:5173/login
2. Click "Continue with Google"
3. You should see the real Google login popup
4. Select your Google account
5. Grant permissions
6. You'll be logged in automatically!

## Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:** Make sure you added `http://localhost:5173` to Authorized JavaScript origins in Google Console

### Error: "invalid_client"
**Solution:** Check that your Client ID in `.env` is correct

### Error: "popup_closed_by_user"
**Solution:** This is normal - user closed the popup. Try again.

### Google popup doesn't appear
**Solution:** 
1. Check browser console for errors
2. Make sure you restarted dev server after adding `.env`
3. Check if popup was blocked by browser

### Still using demo login?
**Solution:**
1. Make sure `.env` file exists in project root
2. Make sure it starts with `VITE_` (required for Vite)
3. Restart dev server
4. Clear browser cache

## Security Notes

### For Development:
- ✅ Using localhost is fine
- ✅ Client ID can be public
- ✅ No backend needed for basic auth

### For Production:
- 🔒 Add your production domain to Authorized origins
- 🔒 Use HTTPS only
- 🔒 Verify tokens on backend
- 🔒 Store sensitive data securely

## What Happens When User Logs In?

1. User clicks "Continue with Google"
2. Google popup opens
3. User selects account and grants permission
4. Google returns user info (email, name, picture)
5. App creates/logs in user automatically
6. User is redirected to home page

## User Data Received from Google

```javascript
{
  email: "user@gmail.com",
  name: "John Doe",
  picture: "https://lh3.googleusercontent.com/...",
  sub: "1234567890",  // Google user ID
  email_verified: true
}
```

## Testing with Multiple Accounts

You can test with multiple Google accounts:
1. Click Google login
2. Select "Use another account"
3. Sign in with different Google account
4. Each account creates a separate user in your app

## Production Deployment

When deploying to production (e.g., Vercel, Netlify):

1. Add production URL to Google Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

2. Add environment variable to hosting platform:
   - Variable name: `VITE_GOOGLE_CLIENT_ID`
   - Value: Your Client ID

3. Redeploy your app

## Advanced: Backend Verification (Optional)

For production apps, verify the token on your backend:

```javascript
// backend/routes/auth.js
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload()
  return payload
}
```

## Need Help?

Common issues:
- **Can't find Client ID?** Go to Google Console → Credentials
- **Popup blocked?** Allow popups for localhost
- **Not working?** Check browser console for errors

## Quick Reference

```
┌─────────────────────────────────────────────────────┐
│  GOOGLE OAUTH QUICK SETUP                           │
├─────────────────────────────────────────────────────┤
│  1. Google Console: console.cloud.google.com        │
│  2. Create Project                                  │
│  3. Enable Google+ API                              │
│  4. Create OAuth Client ID                          │
│  5. Add localhost:5173 to origins                   │
│  6. Copy Client ID                                  │
│  7. Create .env file                                │
│  8. Add: VITE_GOOGLE_CLIENT_ID=your_id              │
│  9. Restart dev server                              │
│  10. Test login!                                    │
└─────────────────────────────────────────────────────┘
```

## Resources

- Google Cloud Console: https://console.cloud.google.com/
- OAuth Documentation: https://developers.google.com/identity/protocols/oauth2
- React OAuth Library: https://www.npmjs.com/package/@react-oauth/google
