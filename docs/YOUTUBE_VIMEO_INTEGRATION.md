# YouTube & Vimeo Integration Guide

## ✅ Legal Video Embedding

Your Moviefy platform now supports **legal** video embedding from YouTube and Vimeo!

---

## 🎬 How to Add YouTube Videos

### Method 1: Using YouTube Video ID
```
Video URL: youtube:VIDEO_ID_HERE
Example: youtube:dQw4w9WgXcQ
```

### Method 2: Using Full YouTube URL
```
Video URL: https://www.youtube.com/watch?v=VIDEO_ID
Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Method 3: Using Short YouTube URL
```
Video URL: https://youtu.be/VIDEO_ID
Example: https://youtu.be/dQw4w9WgXcQ
```

---

## 📹 How to Add Vimeo Videos

### Method 1: Using Vimeo Video ID
```
Video URL: vimeo:VIDEO_ID_HERE
Example: vimeo:123456789
```

### Method 2: Using Full Vimeo URL
```
Video URL: https://vimeo.com/VIDEO_ID
Example: https://vimeo.com/123456789
```

---

## 🎯 Step-by-Step: Adding a YouTube Movie

1. **Find a Video on YouTube**
   - Go to YouTube
   - Find a video you want to add
   - Copy the video URL or ID

2. **Login to Admin Panel**
   - Email: admin@moviefy.com
   - Password: admin123

3. **Go to Movies Tab**
   - Click "🎬 Movies"
   - Click "+ Add New Movie"

4. **Fill in the Form**
   ```
   Title: Your Movie Title
   Year: 2024
   Duration: 2h 15m
   Rating: PG-13
   Category: action
   Description: Movie description here
   Poster URL: https://images.unsplash.com/photo-xxx
   Backdrop URL: https://images.unsplash.com/photo-xxx
   Video URL: youtube:dQw4w9WgXcQ
   ```

5. **Click "Add Movie"**
   - Movie will appear on home page
   - Click play to watch via YouTube embed

---

## 🎥 Legal YouTube Content Sources

### 1. **YouTube Movies** (Official Channel)
- URL: https://www.youtube.com/movies
- Free movies with ads
- Legally available content

### 2. **Public Domain Movies**
- Search: "public domain movies"
- Channels: Public Domain Movies, Classic Cinema
- 100% legal to embed

### 3. **Creative Commons Videos**
- Filter by Creative Commons license
- Free to use and embed
- Proper attribution required

### 4. **Official Studio Channels**
- Many studios upload trailers and clips
- Legal to embed if allowed by channel
- Check video's embed settings

### 5. **Free Movie Channels**
- Popcornflix
- Crackle
- Tubi (some content)
- Pluto TV

---

## 📺 Legal Vimeo Content Sources

### 1. **Vimeo On Demand**
- Professional content
- Some free videos available
- Check embed permissions

### 2. **Creative Commons on Vimeo**
- Filter by CC license
- Free to use
- Attribution required

### 3. **Vimeo Staff Picks**
- High-quality content
- Many allow embedding
- Check individual video settings

---

## ⚖️ Legal Guidelines

### ✅ You CAN Embed:
- Videos marked as "embeddable"
- Public domain content
- Creative Commons licensed videos
- Videos you have permission to use
- Official trailers and promotional content

### ❌ You CANNOT Embed:
- Videos with embedding disabled
- Copyrighted content without permission
- Pirated or illegally uploaded content
- Content that violates platform terms

---

## 🔍 How to Check if Embedding is Allowed

### YouTube:
1. Go to video page
2. Click "Share" button
3. Click "Embed"
4. If embed code appears → Embedding is allowed
5. If error message → Embedding is disabled

### Vimeo:
1. Go to video page
2. Click "Share" button
3. Look for embed code
4. Check video settings for restrictions

---

## 💡 Example Movies You Can Add

### Public Domain Movies on YouTube:

1. **Night of the Living Dead (1968)**
   ```
   Video URL: youtube:F2YXCf-yXCM
   ```

2. **Nosferatu (1922)**
   ```
   Video URL: youtube:FC6jFoYm3xs
   ```

3. **The Great Train Robbery (1903)**
   ```
   Video URL: youtube:1BZs005Hbgs
   ```

4. **Metropolis (1927)**
   ```
   Video URL: youtube:Q0NzALRJifI
   ```

5. **His Girl Friday (1940)**
   ```
   Video URL: youtube:3WwUT5pWc_k
   ```

---

## 🎬 Adding a Complete Movie Example

Here's a complete example using a public domain movie:

```
Title: Night of the Living Dead
Year: 1968
Duration: 1h 36m
Rating: Not Rated
Category: horror
Description: A group of people hide from bloodthirsty zombies in a farmhouse.
Poster URL: https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop
Backdrop URL: https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop
Video URL: youtube:F2YXCf-yXCM
```

---

## 🚀 Benefits of YouTube/Vimeo Integration

✅ **Legal**: Embedding is allowed by platforms
✅ **Free**: No hosting costs
✅ **Reliable**: Professional video delivery
✅ **Fast**: CDN-powered streaming
✅ **Quality**: Adaptive bitrate streaming
✅ **Mobile-Friendly**: Works on all devices

---

## 📊 Supported Video Formats

### Direct Video Files:
- `.mp4` (H.264)
- `.webm`
- `.ogg`

### Embedded Platforms:
- YouTube (all formats)
- Vimeo (all formats)

---

## 🔧 Technical Details

### YouTube Embed Features:
- Autoplay on open
- Related videos disabled (`rel=0`)
- Full controls available
- Fullscreen support
- Mobile responsive

### Vimeo Embed Features:
- Autoplay on open
- Full controls available
- Fullscreen support
- High-quality playback
- Mobile responsive

---

## 🎯 Best Practices

1. **Always Check Permissions**
   - Verify embedding is allowed
   - Check video license
   - Respect copyright

2. **Use High-Quality Sources**
   - Official channels preferred
   - HD quality when available
   - Reliable uploaders

3. **Provide Proper Attribution**
   - Credit original creators
   - Link to source when required
   - Follow CC license terms

4. **Test Before Publishing**
   - Verify video plays correctly
   - Check on mobile devices
   - Ensure embed still works

5. **Monitor Your Content**
   - Videos can be removed by owners
   - Check periodically for broken links
   - Have backup sources

---

## 🆘 Troubleshooting

### Video Won't Play:
- Check if embedding is still allowed
- Verify video ID is correct
- Check if video was removed
- Try different browser

### Video Shows Error:
- Video may have embedding disabled
- Video might be region-restricted
- Check your internet connection
- Clear browser cache

### Video Quality Issues:
- Check your internet speed
- Try different video source
- Use official channels for better quality

---

## 📝 Quick Reference

### Add YouTube Video:
```javascript
Video URL: youtube:VIDEO_ID
// or
Video URL: https://www.youtube.com/watch?v=VIDEO_ID
```

### Add Vimeo Video:
```javascript
Video URL: vimeo:VIDEO_ID
// or
Video URL: https://vimeo.com/VIDEO_ID
```

### Add Direct Video:
```javascript
Video URL: https://example.com/video.mp4
```

---

## 🎉 You're All Set!

Your platform now supports:
- ✅ YouTube embeds
- ✅ Vimeo embeds
- ✅ Direct video files
- ✅ Legal content integration

Start adding legal content to your platform and enjoy streaming! 🍿

---

**Remember**: Always respect copyright laws and platform terms of service. Only embed content you have permission to use!
