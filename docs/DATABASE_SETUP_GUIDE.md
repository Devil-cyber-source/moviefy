# 🗄️ Real Database Setup Guide - MongoDB

## ✅ What's Done

Your Moviefy app now uses **MongoDB** as a real database instead of localStorage!

### Changes Made:
- ✅ Installed Mongoose (MongoDB ODM)
- ✅ Created database connection
- ✅ Updated User model with all features
- ✅ Created authentication API routes
- ✅ Updated frontend to use API
- ✅ Configured CORS and security

---

## 🚀 Quick Setup (5 Minutes)

### Option 1: Local MongoDB (Recommended for Development)

#### Windows:
1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server
   - Run installer (choose "Complete" installation)

2. **Start MongoDB:**
   ```bash
   # MongoDB should start automatically as a service
   # Or manually start it:
   net start MongoDB
   ```

3. **Verify it's running:**
   ```bash
   mongosh
   # You should see MongoDB shell
   ```

#### Mac:
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Setup Access:**
   - Create database user (username + password)
   - Add IP address: `0.0.0.0/0` (allow from anywhere)
   - Click "Finish and Close"

4. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

5. **Update backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
   ```

---

## 🔧 Start Your Backend

### 1. Navigate to backend folder:
```bash
cd backend
```

### 2. Install dependencies (if not done):
```bash
npm install
```

### 3. Start the server:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
📊 Database: moviefy
✅ Default admin user created
🚀 Server running on http://localhost:5000
```

---

## 🎯 Test the Database

### 1. Check Health:
Open browser: http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "message": "Moviefy API is running",
  "database": "MongoDB",
  "users": 1
}
```

### 2. Test Login:
```bash
# Using curl (Windows PowerShell)
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"admin@moviefy.com","password":"admin123"}'

# Or use Postman/Insomnia
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@moviefy.com",
  "password": "admin123"
}
```

---

## 🔗 Connect Frontend to Backend

### 1. Make sure backend is running:
```bash
cd backend
npm run dev
```

### 2. Start frontend (in new terminal):
```bash
cd ..
npm run dev
```

### 3. Test Login:
- Open: http://localhost:5173/login
- Email: `admin@moviefy.com`
- Password: `admin123`
- Click "Sign In"

If successful, you're now using the real database! 🎉

---

## 📊 View Your Database

### Using MongoDB Compass (GUI):

1. **Download:**
   - https://www.mongodb.com/try/download/compass

2. **Connect:**
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **View Data:**
   - Database: `moviefy`
   - Collection: `users`
   - You'll see all your users!

### Using Command Line:
```bash
# Open MongoDB shell
mongosh

# Switch to moviefy database
use moviefy

# View all users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find specific user
db.users.findOne({ email: "admin@moviefy.com" })
```

---

## 🎨 Database Features

### User Model Includes:
- ✅ Email/Password authentication
- ✅ Google OAuth support
- ✅ Phone authentication
- ✅ Profile pictures
- ✅ Subscription management
- ✅ Referral system
- ✅ My List (saved movies)
- ✅ Role-based access (user/admin)
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Last login tracking

### Security Features:
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens
- ✅ CORS protection
- ✅ Input validation
- ✅ Unique email/phone constraints

---

## 🔐 Default Users

After starting the backend, you'll have:

| Email | Password | Role |
|-------|----------|------|
| admin@moviefy.com | admin123 | admin |

New users are created automatically when they:
- Sign up with email
- Login with Google
- Login with phone

---

## 📝 API Endpoints

### Authentication:
```
POST /api/auth/register      - Register with email
POST /api/auth/login         - Login with email
POST /api/auth/google        - Google OAuth
POST /api/auth/phone         - Phone OTP
GET  /api/auth/me            - Get current user
```

### Users:
```
GET    /api/users/profile    - Get user profile
POST   /api/users/mylist/:id - Add to my list
DELETE /api/users/mylist/:id - Remove from my list
```

### Health:
```
GET /api/health              - Check API status
```

---

## 🐛 Troubleshooting

### "MongoDB connection error"
**Solutions:**
1. Make sure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Check connection string in `backend/.env`
3. Try MongoDB Atlas (cloud) instead

### "Port 5000 already in use"
**Solution:**
```bash
# Change port in backend/.env
PORT=5001
```

### "CORS error"
**Solution:**
- Make sure backend is running
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL

### "Cannot connect to database"
**Solution:**
1. Check if MongoDB is installed
2. Try: `mongosh` in terminal
3. If fails, reinstall MongoDB

---

## 📊 Database vs localStorage

| Feature | localStorage | MongoDB |
|---------|-------------|---------|
| Storage | Browser only | Server database |
| Persistence | Per browser | Permanent |
| Sharing | No | Yes (across devices) |
| Security | Low | High |
| Backup | Manual | Automatic |
| Scalability | Limited | Unlimited |
| Multi-user | No | Yes |
| Real-time | No | Yes |

---

## 🚀 Production Deployment

### MongoDB Atlas (Recommended):
1. Create production cluster
2. Get connection string
3. Add to hosting environment variables
4. Deploy!

### Backend Hosting Options:
- **Heroku**: Easy deployment
- **Railway**: Modern platform
- **Render**: Free tier available
- **AWS/Azure**: Enterprise scale

### Environment Variables:
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_secret_key
FRONTEND_URL=https://yourdomain.com
```

---

## 📚 Next Steps

1. ✅ Setup MongoDB (local or Atlas)
2. ✅ Start backend server
3. ✅ Test API endpoints
4. ✅ Connect frontend
5. ✅ Test login/signup
6. 🎉 You're done!

---

## 💡 Tips

- **Development**: Use local MongoDB
- **Production**: Use MongoDB Atlas
- **Backup**: MongoDB Atlas has automatic backups
- **Monitoring**: Use MongoDB Compass to view data
- **Security**: Change JWT_SECRET in production

---

## 🎓 Learn More

- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Compass: https://www.mongodb.com/products/compass

---

## ✅ Checklist

Before testing:
- [ ] MongoDB installed/Atlas setup
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5173)
- [ ] Can access http://localhost:5000/api/health

---

## 🎉 Success!

Your app now has a real database! All user data is stored in MongoDB instead of browser localStorage.

**Test it:**
1. Create a new account
2. Close browser
3. Open again
4. You're still logged in!
5. Try from different browser - same account works!

---

**Need help? Check the troubleshooting section or create an issue!**
