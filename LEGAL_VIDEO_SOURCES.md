# Legal Video Sources for Moviefy

## ⚠️ IMPORTANT COPYRIGHT NOTICE
**DO NOT upload copyrighted movies without proper licensing!**

## Legal Free Video Sources

### 1. **Pexels Videos** (100% Free)
- Website: https://www.pexels.com/videos/
- License: Free for commercial use
- No attribution required
- Download MP4 files directly

### 2. **Pixabay Videos** (100% Free)
- Website: https://pixabay.com/videos/
- License: Free for commercial use
- No attribution required
- High-quality stock footage

### 3. **Videvo** (Free & Premium)
- Website: https://www.videvo.net/
- License: Mix of free and premium
- Check individual licenses
- Great for stock footage

### 4. **Archive.org** (Public Domain)
- Website: https://archive.org/details/movies
- License: Public domain content
- Old classic films
- Educational content

### 5. **Blender Open Movies** (Creative Commons)
- Big Buck Bunny
- Sintel
- Tears of Steel
- Already included in demo!

## How to Add Videos to Moviefy

### Method 1: Direct Video URL
```javascript
{
  id: 21,
  title: "Your Video Title",
  videoUrl: "https://your-video-host.com/video.mp4",
  // ... other properties
}
```

### Method 2: YouTube Embed (with permission)
```javascript
{
  id: 22,
  title: "YouTube Video",
  videoUrl: "youtube:VIDEO_ID_HERE",
  // ... other properties
}
```

### Method 3: Vimeo Embed
```javascript
{
  id: 23,
  title: "Vimeo Video",
  videoUrl: "vimeo:VIDEO_ID_HERE",
  // ... other properties
}
```

## Steps to Add Your Own Content

1. **Create or Source Legal Content**
   - Film your own content
   - Use stock footage from sites above
   - Get proper licensing for commercial content

2. **Host Your Videos**
   - Upload to Vimeo (recommended for quality)
   - Upload to YouTube
   - Use a CDN service (AWS S3, Cloudflare)
   - Self-host on your server

3. **Get Video URL**
   - For direct hosting: Get the .mp4 file URL
   - For YouTube: Get the video ID from URL
   - For Vimeo: Get the video ID

4. **Add to movies.js**
   - Open `src/data/movies.js`
   - Add new movie object with videoUrl
   - Save and refresh

## For Real Streaming Platform

To build a real streaming platform with licensed content:

1. **Legal Requirements**
   - Register your business
   - Get content licensing agreements
   - Comply with copyright laws
   - Get distribution rights

2. **Technical Requirements**
   - Video hosting infrastructure (AWS, Azure)
   - CDN for video delivery
   - DRM (Digital Rights Management)
   - Adaptive bitrate streaming (HLS/DASH)

3. **Content Acquisition**
   - License from studios/distributors
   - Create original content
   - Partner with content creators
   - Buy distribution rights

## Recommended Services for Legal Streaming

- **Vimeo OTT**: Build your own streaming service
- **JW Player**: Video hosting and streaming
- **Brightcove**: Enterprise video platform
- **Wistia**: Business video hosting

## Cost Estimates

- **Video Hosting**: $10-100/month (depending on traffic)
- **Content Licensing**: $1,000-$100,000+ per title
- **CDN Costs**: $0.02-0.10 per GB transferred
- **DRM**: $500-5,000/month

---

**Remember**: This demo uses free sample videos. For a production platform, you MUST obtain proper licenses for all content!
