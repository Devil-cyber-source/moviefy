# Backend Scripts

## Clear All Movies from Database

If you want to start fresh and delete all movies from your database:

### Option 1: Using the Script (Recommended)

```bash
cd backend
node scripts/clearMovies.js
```

This will:
- Connect to your MongoDB database
- Delete ALL movies
- Close the connection
- Show you how many movies were deleted

### Option 2: Using MongoDB Shell

```bash
mongosh
use moviefy
db.movies.deleteMany({})
exit
```

### Option 3: Using Admin Panel

1. Go to your app
2. Login as admin (admin@moviefy.com / admin123)
3. Go to Movies tab
4. Click "🗑️ Multi Delete"
5. Select all movies
6. Click "Delete Selected"

---

## When to Use:

- **Start Fresh**: Remove all test movies
- **Clean Database**: Before production deployment
- **Remove Demo Data**: After testing

---

## ⚠️ Warning:

**This permanently deletes all movies from your database!**
- Cannot be undone
- Video files remain on server (need manual deletion)
- Only deletes database records

---

## After Clearing:

1. Refresh your app
2. Should see empty state
3. Upload new movies via Admin → Upload tab
4. Your app is ready!
