# 🚀 Deploy Moviefy - Access from Anywhere

## Option 1: Deploy to Render (Recommended - FREE)

### Backend Deployment

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Name**: moviefy-backend
     - **Root Directory**: backend
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node
   
3. **Add Environment Variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   FRONTEND_URL=https://your-frontend-url.onrender.com
   PORT=5000
   ```

4. **Get MongoDB Connection**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string
   - Add to Render environment variables

### Frontend Deployment

1. **Deploy Frontend**
   - Click "New +" → "Static Site"
   - Connect your GitHub repo
   - Configure:
     - **Name**: moviefy
     - **Root Directory**: frontend
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: dist

2. **Add Environment Variables**
   ```
   VITE_API_URL=https://moviefy-backend.onrender.com
   VITE_GOOGLE_CLIENT_ID=your_google_client_id (optional)
   ```

3. **Update Backend URL**
   - Copy your Render backend URL
   - Update frontend API configuration

---

## Option 2: Deploy to Vercel (Frontend) + Render (Backend)

### Backend on Render (Same as above)

### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://moviefy-backend.onrender.com
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
     ```

---

## Option 3: Deploy to Railway (Full Stack)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select your repo
   - Add service → Backend
   - Set root directory: `backend`
   - Add environment variables

3. **Deploy Frontend**
   - Add service → Frontend
   - Set root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Start command: `npm run preview`

---

## Option 4: Quick Test with Ngrok (Temporary)

For quick testing and sharing:

1. **Install Ngrok**
   ```bash
   npm install -g ngrok
   ```

2. **Start Your Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

3. **Expose Backend**
   ```bash
   # Terminal 3
   ngrok http 5000
   ```
   Copy the HTTPS URL (e.g., https://abc123.ngrok.io)

4. **Expose Frontend**
   ```bash
   # Terminal 4
   ngrok http 5173
   ```
   Copy the HTTPS URL

5. **Update Configuration**
   - Update frontend API URL to use ngrok backend URL
   - Share the frontend ngrok URL with anyone!

---

## Configuration Files Needed

### 1. Update Backend CORS

Already configured! The backend accepts:
- `process.env.FRONTEND_URL` (set in deployment)
- Falls back to `http://localhost:5173`

### 2. Update Frontend API URL

Create `frontend/src/config/api.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### 3. Environment Variables

**Backend (.env)**:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-url.com
PORT=5000
```

**Frontend (.env)**:
```env
VITE_API_URL=https://your-backend-url.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Quick Deploy Commands

I can help you set up any of these options. Which would you like?

1. **Render** (Recommended - Free, Easy)
2. **Vercel + Render** (Fast, Free)
3. **Railway** (All-in-one, Free tier)
4. **Ngrok** (Quick test, Temporary)

Let me know and I'll configure everything for you!
