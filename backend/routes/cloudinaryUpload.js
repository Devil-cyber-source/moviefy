import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Movie from '../models/Movie.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import fs from 'fs';

const router = express.Router();

// Configure multer for temporary storage
const upload = multer({ 
  dest: 'temp/',
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for Cloudinary free tier
});

// Upload video to Cloudinary
router.post('/video', authMiddleware, adminMiddleware, upload.single('video'), async (req, res) => {
  try {
    const { title, description, category, year, thumbnail, backdrop, duration, rating } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    console.log('📤 Uploading to Cloudinary...');

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
      folder: 'moviefy/videos',
      public_id: `${Date.now()}-${title.replace(/[^a-zA-Z0-9]/g, '-')}`,
      chunk_size: 6000000, // 6MB chunks
      eager: [
        { width: 1280, height: 720, crop: 'limit', quality: 'auto' }
      ],
      eager_async: true
    });

    console.log('✅ Uploaded to Cloudinary:', result.secure_url);

    // Delete temporary file
    fs.unlinkSync(req.file.path);

    // Save to database
    const movie = new Movie({
      title,
      description,
      thumbnail: thumbnail || result.secure_url,
      backdrop: backdrop || thumbnail,
      poster: thumbnail,
      videoUrl: result.secure_url,
      category,
      year: parseInt(year),
      duration,
      rating,
      uploadedBy: req.user.id,
      status: 'ready',
      cloudinaryId: result.public_id
    });

    await movie.save();

    res.json({
      success: true,
      message: 'Video uploaded successfully to Cloudinary',
      movie,
      cloudinaryUrl: result.secure_url
    });

  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    
    // Clean up temp file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to upload to Cloudinary'
    });
  }
});

// Delete video from Cloudinary
router.delete('/video/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Delete from Cloudinary if it has cloudinaryId
    if (movie.cloudinaryId) {
      await cloudinary.uploader.destroy(movie.cloudinaryId, { resource_type: 'video' });
      console.log('✅ Deleted from Cloudinary:', movie.cloudinaryId);
    }

    // Delete from database
    await Movie.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
