# Database Information - Moviefy App

## Current Database: Browser localStorage

Your Moviefy app currently uses **browser localStorage** as the database. This is a client-side storage solution built into web browsers.

## Where is the Data Stored?

### Location:
- **Storage Type**: Browser localStorage (Client-side)
- **Physical Location**: Your browser's local storage on your computer
- **Scope**: Per domain (http://localhost:5173)
- **Persistence**: Data persists even after closing the browser

### Storage Keys:
1. **`users`** - Array of all registered users
2. **`currentUser`** - Currently logged-in user data

## How to View Your Data

### Method 1: Browser DevTools (Recommended)
1. Open your app in browser (http://localhost:5173)
2. Press **F12** to open Developer Tools
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click on **Local Storage** → **http://localhost:5173**
5. You'll see:
   - `users` - All user accounts
   - `currentUser` - Current logged-in user

### Method 2: Console Commands
Open browser console (F12 → Console) and run:

```javascript
// View all users
console.log(JSON.parse(localStorage.getItem('users')))

// View current user
console.log(JSON.parse(localStorage.getItem('currentUser')))

// Count total users
console.log('Total users:', JSON.parse(localStorage.getItem('users')).length)
```

## Data Structure

### Users Array Structure:
```json
[
  {
    "id": 1,
    "email": "admin@moviefy.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "admin",
    "authProvider": "email",
    "myList": [],
    "subscription": {
      "plan": "premium",
      "status": "active",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2025-01-01T00:00:00.000Z",
      "autoRenew": true
    },
    "referral": {
      "code": "ADMIN001",
      "referredBy": null,
      "referredUsers": [],
      "rewards": 0,
      "rewardsEarned": 0,
      "hasPurchased": true
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### User Types by Auth Provider:
1. **Email Users**: `authProvider: "email"` or undefined
2. **Google Users**: `authProvider: "google"` + picture URL
3. **Phone Users**: `authProvider: "phone"` + phone field

## Default Users

The app comes with 2 default users:

| Email | Password | Role | Plan |
|-------|----------|------|------|
| admin@moviefy.com | admin123 | admin | premium |
| user@moviefy.com | user123 | user | standard |

## Managing Your Data

### Clear All Data:
```javascript
// In browser console
localStorage.clear()
// Then refresh the page
```

### Export Data (Backup):
```javascript
// In browser console
const backup = {
  users: localStorage.getItem('users'),
  currentUser: localStorage.getItem('currentUser')
}
console.log(JSON.stringify(backup, null, 2))
// Copy the output and save to a file
```

### Import Data (Restore):
```javascript
// In browser console
const backup = {
  users: '...', // paste your backup data
  currentUser: '...'
}
localStorage.setItem('users', backup.users)
localStorage.setItem('currentUser', backup.currentUser)
// Then refresh the page
```

### Reset to Default Users:
```javascript
// In browser console
localStorage.removeItem('users')
localStorage.removeItem('currentUser')
// Then refresh the page
```

## Limitations of localStorage

### Current Limitations:
- ❌ **No server-side storage** - Data only exists in browser
- ❌ **Not shared** - Each browser/device has separate data
- ❌ **Size limit** - Usually 5-10MB per domain
- ❌ **No backup** - Clearing browser data deletes everything
- ❌ **Not secure** - Anyone with browser access can view data
- ❌ **No real-time sync** - Can't sync across devices

### Advantages:
- ✅ **Fast** - Instant read/write
- ✅ **No server needed** - Works offline
- ✅ **Simple** - Easy to implement
- ✅ **Free** - No hosting costs
- ✅ **Good for demos** - Perfect for prototyping

## Migrating to Real Database

If you want to use a real database, here are your options:

### Option 1: MongoDB (Recommended)
```bash
# Install MongoDB
npm install mongodb mongoose

# Benefits:
- NoSQL database
- Flexible schema
- Easy to scale
- Free tier available (MongoDB Atlas)
```

### Option 2: PostgreSQL
```bash
# Install PostgreSQL
npm install pg

# Benefits:
- Relational database
- ACID compliant
- Strong data integrity
- Free and open source
```

### Option 3: Firebase
```bash
# Install Firebase
npm install firebase

# Benefits:
- Real-time database
- Built-in authentication
- Easy Google integration
- Free tier available
```

### Option 4: Supabase
```bash
# Install Supabase
npm install @supabase/supabase-js

# Benefits:
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- Free tier available
```

## Backend Setup (Optional)

I noticed you have a `backend` folder. To connect your app to a real database:

### Step 1: Set up backend API
```javascript
// backend/server.js
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/moviefy')

app.post('/api/auth/login', async (req, res) => {
  // Handle login
})

app.post('/api/auth/signup', async (req, res) => {
  // Handle signup
})
```

### Step 2: Update frontend to use API
```javascript
// src/services/api.js
export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}
```

## Current Data Flow

```
User Action (Login/Signup)
    ↓
AuthContext.jsx
    ↓
localStorage.setItem('users', ...)
    ↓
Browser localStorage
    ↓
Data persists in browser
```

## Questions?

- **Q: Will my data be lost if I clear browser cache?**
  - A: Yes, localStorage data is cleared with browser cache

- **Q: Can I access this data from another computer?**
  - A: No, localStorage is device-specific

- **Q: Is my password secure?**
  - A: No, passwords are stored in plain text in localStorage (not secure for production)

- **Q: How do I backup my data?**
  - A: Use the export commands above or use browser DevTools to copy the data

- **Q: Can I use this in production?**
  - A: Not recommended. Use a real database for production apps

## Need Help?

If you want to migrate to a real database, let me know which option you prefer:
1. MongoDB (NoSQL, flexible)
2. PostgreSQL (SQL, structured)
3. Firebase (Google, real-time)
4. Supabase (PostgreSQL + real-time)

I can help you set up any of these!
