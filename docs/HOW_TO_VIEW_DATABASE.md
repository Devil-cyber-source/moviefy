# How to View Your Database

## Quick Start - 3 Easy Ways

### Method 1: Browser Console (Easiest) ⭐

1. Open your app: http://localhost:5173
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. Type these commands:

```javascript
// View all users
db.getAllUsers()

// View current logged-in user
db.getCurrentUser()

// View statistics
db.getStats()

// See all available commands
db.help()
```

### Method 2: Browser DevTools (Visual)

1. Open your app: http://localhost:5173
2. Press **F12**
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click **Local Storage** → **http://localhost:5173**
5. Click on `users` to see all users
6. Click on `currentUser` to see logged-in user

### Method 3: Console Commands (Advanced)

```javascript
// View raw data
console.log(JSON.parse(localStorage.getItem('users')))

// Pretty print
console.table(JSON.parse(localStorage.getItem('users')))
```

## Database Viewer Commands

I've added a `db` utility that's available in your browser console!

### View Data:
```javascript
db.getAllUsers()              // See all users in a table
db.getCurrentUser()           // See who's logged in
db.findUser('email@test.com') // Find specific user
db.getStats()                 // Database statistics
```

### Add/Remove Users:
```javascript
// Add new user
db.addUser('test@test.com', 'password123', 'Test User', 'user')

// Delete user
db.deleteUser('test@test.com')

// Update subscription
db.updateSubscription('test@test.com', 'premium')
```

### Backup & Restore:
```javascript
// Export (downloads a file)
db.export()

// Import from backup
db.import(backupData)

// Clear all data
db.clear()

// Reset to defaults
db.reset()
```

## What Data is Stored?

### 1. Users Array (`users` key)
All registered users with:
- Email & password
- Name & role
- Subscription details
- Referral codes
- My list (saved movies)
- Auth provider (email/google/phone)

### 2. Current User (`currentUser` key)
The currently logged-in user (without password)

## Example: View Your Data

Open console (F12) and run:

```javascript
// 1. See how many users you have
db.getStats()

// Output:
// ┌─────────────────────────┬────────┐
// │ totalUsers              │ 2      │
// │ emailUsers              │ 2      │
// │ googleUsers             │ 0      │
// │ phoneUsers              │ 0      │
// │ adminUsers              │ 1      │
// │ activeSubscriptions     │ 2      │
// │ trialUsers              │ 0      │
// └─────────────────────────┴────────┘

// 2. View all users
db.getAllUsers()

// Output:
// ┌─────┬────┬──────────────────────┬────────────┬──────┬──────────────┬─────────┬────────┐
// │ id  │ email                    │ name       │ role │ authProvider │ plan    │ status │
// ├─────┼────┼──────────────────────┼────────────┼──────┼──────────────┼─────────┼────────┤
// │ 1   │ admin@moviefy.com        │ Admin User │ admin│ email        │ premium │ active │
// │ 2   │ user@moviefy.com         │ Demo User  │ user │ email        │ standard│ active │
// └─────┴────┴──────────────────────┴────────────┴──────┴──────────────┴─────────┴────────┘

// 3. Find specific user
db.findUser('admin@moviefy.com')

// Output: Full user object with all details
```

## Example: Manage Users

```javascript
// Add a new premium user
db.addUser('premium@test.com', 'test123', 'Premium User', 'user')

// Upgrade to premium
db.updateSubscription('premium@test.com', 'premium')

// Delete a user
db.deleteUser('premium@test.com')
```

## Example: Backup Your Data

```javascript
// Export (automatically downloads a JSON file)
db.export()

// This creates a file like: moviefy-backup-1234567890.json
```

## Example: Restore Data

```javascript
// If you have a backup file, paste its content:
const backup = {
  "users": "[...]",
  "currentUser": "[...]"
}

db.import(backup)
// Then refresh the page
```

## Where is the Data Physically?

**Location on Windows:**
```
C:\Users\[YourUsername]\AppData\Local\[BrowserName]\User Data\Default\Local Storage\leveldb\
```

**Location on Mac:**
```
~/Library/Application Support/[BrowserName]/Default/Local Storage/
```

**Location on Linux:**
```
~/.config/[BrowserName]/Default/Local Storage/
```

But you don't need to access these files directly! Use the browser DevTools or console commands above.

## Important Notes

⚠️ **Data is stored in your browser only**
- Each browser has separate data
- Clearing browser cache deletes all data
- Not shared across devices
- Not backed up automatically

✅ **For production, use a real database:**
- MongoDB
- PostgreSQL
- Firebase
- Supabase

## Need Help?

If you want to:
- Migrate to a real database
- Set up automatic backups
- Sync data across devices
- Add more features

Just let me know! I can help you set up any database system.

## Quick Reference Card

```
┌─────────────────────────────────────────────────────┐
│  MOVIEFY DATABASE QUICK REFERENCE                   │
├─────────────────────────────────────────────────────┤
│  View:                                              │
│    db.getAllUsers()        - All users              │
│    db.getCurrentUser()     - Current user           │
│    db.getStats()           - Statistics             │
│                                                     │
│  Manage:                                            │
│    db.addUser(...)         - Add user               │
│    db.deleteUser(email)    - Delete user            │
│                                                     │
│  Backup:                                            │
│    db.export()             - Download backup        │
│    db.import(data)         - Restore backup         │
│    db.clear()              - Delete all             │
│                                                     │
│  Help:                                              │
│    db.help()               - Show all commands      │
└─────────────────────────────────────────────────────┘
```

Press F12 and type `db.help()` to get started!
