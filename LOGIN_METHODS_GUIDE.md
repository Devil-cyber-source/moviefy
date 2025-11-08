# Login Methods Guide

## Overview
The Moviefy app now supports three authentication methods:
1. **Email/Password Login** (Traditional)
2. **Google Login** (OAuth)
3. **Phone Number Login** (OTP-based)

## Features Added

### 1. Google Login
- One-click authentication with Google account
- Automatically creates user account if doesn't exist
- Users get 30-day free trial on first signup
- Visual Google logo button for easy recognition

**Demo Mode:**
- Currently simulates Google OAuth
- Creates a demo Google user account
- In production, integrate with Google OAuth 2.0 API

### 2. Phone Number Login
- OTP (One-Time Password) based authentication
- No password required
- Automatically creates account on first login
- Users get 30-day free trial on first signup

**Demo Mode:**
- OTP is fixed as `123456` for testing
- In production, integrate with SMS gateway (Twilio, AWS SNS, etc.)

### 3. Email/Password Login
- Traditional authentication method
- Existing functionality maintained
- Password validation (minimum 6 characters)

## User Interface

### Login Page Features:
- **Google Login Button** at the top with Google branding
- **Tab System** to switch between Email and Phone login
- **Clean Divider** with "OR" text
- **Responsive Design** that works on all devices

### Signup Page Features:
- Same Google signup option
- Tab system for Email/Phone signup
- Referral code support for all methods
- Consistent UI/UX with login page

## How to Use

### For Email Login:
1. Go to login page
2. Select "Email" tab (default)
3. Enter email and password
4. Click "Sign In"

### For Phone Login:
1. Go to login page
2. Select "Phone" tab
3. Enter phone number (e.g., +1234567890)
4. Click "Send OTP"
5. Enter OTP: `123456` (demo)
6. Click "Verify OTP"

### For Google Login:
1. Go to login page
2. Click "Continue with Google" button
3. Automatically logged in (demo mode)

## Technical Implementation

### Files Modified:
- `src/pages/Login.jsx` - Added Google and phone login UI
- `src/pages/Signup.jsx` - Added Google and phone signup UI
- `src/context/AuthContext.jsx` - Added `loginWithGoogle()` and `loginWithPhone()` methods
- `src/pages/Auth.css` - Added styles for social buttons, tabs, and dividers

### New Functions in AuthContext:
```javascript
loginWithGoogle() // Handles Google OAuth login
loginWithPhone(phone, otp) // Handles phone OTP verification
```

### Data Storage:
- Users authenticated via Google/Phone are stored in localStorage
- Phone users get email format: `{phone}@moviefy.phone`
- Google users store profile picture URL
- All users get same subscription and referral features

## Production Integration

### For Google OAuth:
1. Create Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Install: `npm install @react-oauth/google`
5. Wrap app with `GoogleOAuthProvider`
6. Replace demo function with actual Google login

### For Phone OTP:
1. Choose SMS provider (Twilio, AWS SNS, Firebase Auth)
2. Set up backend endpoint for OTP generation
3. Implement OTP verification endpoint
4. Add rate limiting and security measures
5. Replace demo OTP with actual verification

## Security Notes

**Current Demo Limitations:**
- Fixed OTP (123456) - NOT for production
- No actual Google OAuth - simulated
- No rate limiting on OTP requests
- No phone number validation

**Production Requirements:**
- Implement proper OTP generation and expiry
- Add rate limiting (max 3 OTP requests per hour)
- Validate phone numbers with regex
- Secure Google OAuth with proper credentials
- Add CSRF protection
- Implement session management
- Use HTTPS only

## Testing

### Test Accounts:
- **Email**: admin@moviefy.com / admin123
- **Email**: user@moviefy.com / user123
- **Phone**: Any number with OTP: 123456
- **Google**: Automatically creates google.user@gmail.com

### Test Scenarios:
1. ✅ Login with existing email account
2. ✅ Login with phone (creates new account)
3. ✅ Login with Google (creates new account)
4. ✅ Switch between login methods
5. ✅ Invalid OTP handling
6. ✅ Referral code support for all methods

## Future Enhancements

- [ ] Add Facebook login
- [ ] Add Apple Sign In
- [ ] Implement 2FA for email accounts
- [ ] Add biometric authentication
- [ ] Remember device feature
- [ ] Social account linking
- [ ] Password reset via phone
- [ ] Email verification
