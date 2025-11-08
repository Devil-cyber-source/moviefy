import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from '../db.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|mkv|avi|mov|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

// Upload video endpoint
router.post('/video', authMiddleware, adminMiddleware, upload.single('video'), async (req, res) => {
  try {
    const { title, description, category, year, thumbnail } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const videoUrl = `/uploads/videos/${req.file.filename}`;

    await db.read();
    const movie = {
      id: Date.now().toString(),
      title,
      description,
      thumbnail,
      videoUrl,
      category,
      year: parseInt(year),
      uploadedBy: req.user.id,
      status: 'ready',
      views: 0,
      rating: 0,
      createdAt: new Date().toISOString()
    };

    db.data.movies.push(movie);
    await db.write();

    res.json({
      message: 'Video uploaded successfully',
      movie
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
