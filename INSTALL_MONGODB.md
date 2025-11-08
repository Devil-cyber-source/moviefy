# 📦 Install MongoDB - Quick Guide

## Choose Your Option:

### ☁️ Option 1: MongoDB Atlas (Easiest - No Installation)

**Best for:** Quick start, no local setup needed

1. **Sign up (Free):**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create account (use Google sign-in for faster setup)

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose **"M0 FREE"** tier
   - Select region closest to you
   - Click "Create"
   - Wait 3-5 minutes for cluster creation

3. **Setup Security:**
   - **Database Access:**
     - Click "Database Access" in left menu
     - Click "Add New Database User"
     - Username: `moviefy`
     - Password: Generate secure password (save it!)
     - Database User Privileges: "Read and write to any database"
     - Click "Add User"
   
   - **Network Access:**
     - Click "Network Access" in left menu
     - Click "Add IP Address"
     - Click "Allow Access from Anywhere" (0.0.0.0/0)
     - Click "Confirm"

4. **Get Connection String:**
   - Click "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://moviefy:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

5. **Update backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://moviefy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/moviefy?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_PASSWORD` with your actual password
   - Keep `/moviefy` at the end (database name)

6. **Restart Backend:**
   ```bash
   cd backend
   npm run dev
   ```

✅ **Done! You should see:** "✅ MongoDB connected successfully"

---

### 💻 Option 2: Local MongoDB (Windows)

**Best for:** Offline development, full control

1. **Download:**
   - Go to: https://www.mongodb.com/try/download/community
   - Version: Latest
   - Platform: Windows
   - Package: MSI
   - Click "Download"

2. **Install:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool)
   - Click "Next" → "Install"
   - Wait for installation (5-10 minutes)

3. **Verify Installation:**
   ```bash
   # Open Command Prompt or PowerShell
   mongosh --version
   ```
   You should see version number

4. **Start MongoDB:**
   ```bash
   # MongoDB should start automatically as a service
   # If not, start it manually:
   net start MongoDB
   ```

5. **Test Connection:**
   ```bash
   mongosh
   ```
   You should see MongoDB shell

6. **Backend is ready!**
   ```bash
   cd backend
   npm run dev
   ```

✅ **Done! You should see:** "✅ MongoDB connected successfully"

---

### 🍎 Option 3: Local MongoDB (Mac)

1. **Install Homebrew** (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install MongoDB:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

3. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

4. **Verify:**
   ```bash
   mongosh
   ```

5. **Backend is ready!**
   ```bash
   cd backend
   npm run dev
   ```

---

### 🐧 Option 4: Local MongoDB (Linux)

#### Ubuntu/Debian:
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

---

## 🔍 Verify Everything Works

### 1. Check Backend Health:
Open browser: http://localhost:5000/api/health

Should show:
```json
{
  "status": "ok",
  "database": "MongoDB",
  "users": 1
}
```

### 2. Check MongoDB Compass (if installed):
- Open MongoDB Compass
- Connection string: `mongodb://localhost:27017`
- Click "Connect"
- You should see `moviefy` database

### 3. Test Login:
- Open: http://localhost:5173/login
- Email: `admin@moviefy.com`
- Password: `admin123`
- Click "Sign In"

If successful: 🎉 **Database is working!**

---

## 🐛 Troubleshooting

### "MongoDB connection error"

**Windows:**
```bash
# Check if MongoDB service is running
sc query MongoDB

# If not running, start it:
net start MongoDB
```

**Mac:**
```bash
# Check status
brew services list

# Start if not running
brew services start mongodb-community
```

**Linux:**
```bash
# Check status
sudo systemctl status mongod

# Start if not running
sudo systemctl start mongod
```

### "Connection refused"

1. Make sure MongoDB is installed
2. Make sure MongoDB service is running
3. Try MongoDB Atlas instead (easier)

### "Authentication failed" (Atlas)

1. Check username/password in connection string
2. Make sure you replaced `<password>` with actual password
3. Check Network Access allows your IP (0.0.0.0/0)

---

## 💡 Recommendations

| Scenario | Recommendation |
|----------|---------------|
| Just testing | MongoDB Atlas (free, easy) |
| Development | Local MongoDB (faster) |
| Production | MongoDB Atlas (reliable, backups) |
| Learning | Local MongoDB (full control) |
| Team project | MongoDB Atlas (shared access) |

---

## 📊 What You Get

### With MongoDB Atlas (Cloud):
- ✅ No installation needed
- ✅ Automatic backups
- ✅ Access from anywhere
- ✅ Free 512MB storage
- ✅ Monitoring dashboard
- ✅ Easy scaling

### With Local MongoDB:
- ✅ Works offline
- ✅ Faster (no network latency)
- ✅ Full control
- ✅ No data limits
- ✅ Privacy (data stays local)

---

## 🎯 Quick Decision

**Choose MongoDB Atlas if:**
- You want to start immediately
- You don't want to install anything
- You're deploying to production soon
- You're working in a team

**Choose Local MongoDB if:**
- You want offline development
- You have admin rights on your computer
- You want faster performance
- You're learning MongoDB

---

## ✅ Next Steps

After MongoDB is running:

1. ✅ Start backend: `cd backend && npm run dev`
2. ✅ Start frontend: `npm run dev`
3. ✅ Test login at: http://localhost:5173/login
4. 🎉 Enjoy your real database!

---

## 📚 Resources

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Download: https://www.mongodb.com/try/download/community
- MongoDB Docs: https://docs.mongodb.com/
- MongoDB Compass: https://www.mongodb.com/products/compass

---

**Need help? Check the troubleshooting section or ask for assistance!**
