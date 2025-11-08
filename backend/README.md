# Moviefy Backend - Video Streaming API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Start Server
```bash
npm run dev
```

Server runs on http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get all movies (with filters)
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie (admin)
- `PUT /api/movies/:id` - Update movie (admin)
- `DELETE /api/movies/:id` - Delete movie (admin)

### Upload
- `POST /api/upload/video` - Upload video file (admin)
- `POST /api/upload/video-cloud` - Upload to cloud storage (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `POST /api/users/mylist/:movieId` - Add to my list
- `DELETE /api/users/mylist/:movieId` - Remove from my list

## 🎥 Video Upload Options

### Option 1: Local Storage (Development)
Videos stored in `./uploads/videos/`
- Good for testing
- Limited by server storage
- Not recommended for production

### Option 2: Cloud Storage (Production)

#### AWS S3
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

#### Cloudflare R2 (Cheaper alternative)
```bash
npm install @aws-sdk/client-s3
# R2 is S3-compatible
```

## 🔧 Video Processing

For multiple quality options (360p, 720p, 1080p):

```bash
npm install fluent-ffmpeg
# Also install FFmpeg on your system
```

## 📦 Deployment Options

### Option 1: VPS (DigitalOcean, Linode, AWS EC2)
- Full control
- Install MongoDB, Node.js, FFmpeg
- Use PM2 for process management

### Option 2: Cloud Platform
- Heroku (easy but expensive)
- Railway.app (modern, affordable)
- Render.com (free tier available)

### Option 3: Serverless
- Vercel/Netlify for API
- AWS Lambda for video processing
- S3/R2 for storage

## 🎬 Video Streaming Best Practices

1. **Use CDN** - CloudFlare, AWS CloudFront
2. **Adaptive Streaming** - HLS or DASH format
3. **Multiple Qualities** - 360p, 480p, 720p, 1080p
4. **Compression** - Use H.264 codec
5. **Thumbnails** - Generate preview images
6. **DRM** (Optional) - For premium content protection

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- Role-based access (admin/user)
- File type validation
- File size limits
- CORS configuration

## 💾 Database Schema

### User
- name, email, password
- role (user/admin)
- subscription details
- referral code
- myList (array of movie IDs)

### Movie
- title, description, thumbnail
- videoUrl, category, year
- rating, views, duration
- videoQuality (multiple resolutions)
- status (processing/ready/failed)

## 📊 Monitoring

Add logging and monitoring:
```bash
npm install winston morgan
```

## 🧪 Testing

```bash
npm install --save-dev jest supertest
```

## 🌐 Connect Frontend

Update your React app to use this API:

```javascript
// src/config/api.js
export const API_URL = 'http://localhost:5000/api';
```

Use fetch or axios to call endpoints.
