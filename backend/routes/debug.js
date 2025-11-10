import express from 'express';
import HiddenMovie from '../models/HiddenMovie.js';
import Movie from '../models/Movie.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Debug endpoint to see all hidden movies (admin only)
router.get('/hidden-movies', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hiddenMovies = await HiddenMovie.find().populate('deletedBy', 'name email');
    const count = await HiddenMovie.countDocuments();
    
    res.json({
      success: true,
      count,
      hiddenMovies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug endpoint to clear all hidden movies (admin only)
router.delete('/hidden-movies/clear', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await HiddenMovie.deleteMany({});
    
    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} hidden movies`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug endpoint to see database stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movieCount = await Movie.countDocuments();
    const hiddenCount = await HiddenMovie.countDocuments();
    
    res.json({
      success: true,
      stats: {
        totalMovies: movieCount,
        hiddenMovies: hiddenCount,
        visibleMovies: movieCount - hiddenCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
