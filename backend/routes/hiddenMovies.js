import express from 'express';
import HiddenMovie from '../models/HiddenMovie.js';
import Movie from '../models/Movie.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all hidden movie IDs (public - so users can filter them out)
router.get('/', async (req, res) => {
  try {
    const hiddenMovies = await HiddenMovie.find().select('movieId deletedAt');
    const hiddenIds = hiddenMovies.map(h => h.movieId);
    console.log('📋 Hidden movies requested. Count:', hiddenIds.length, 'IDs:', hiddenIds);
    res.json({ 
      hiddenIds,
      count: hiddenIds.length,
      details: hiddenMovies 
    });
  } catch (error) {
    console.error('❌ Error fetching hidden movies:', error);
    res.status(500).json({ error: error.message });
  }
});

// Hide a movie (admin only)
router.post('/:movieId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { movieId } = req.params;
    
    // Try to delete from database if it exists
    try {
      await Movie.findByIdAndDelete(movieId);
      console.log('✅ Deleted movie from database:', movieId);
    } catch (err) {
      console.log('⚠️ Movie not in database (probably static movie)');
    }
    
    // Add to hidden movies list
    const hiddenMovie = await HiddenMovie.findOneAndUpdate(
      { movieId },
      { 
        movieId,
        deletedBy: req.user.id,
        deletedAt: new Date()
      },
      { upsert: true, new: true }
    );
    
    console.log('✅ Movie hidden successfully:', movieId, 'Total hidden:', await HiddenMovie.countDocuments());
    
    res.json({ 
      success: true,
      message: 'Movie hidden successfully',
      movieId,
      hiddenMovie 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unhide a movie (admin only)
router.delete('/:movieId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { movieId } = req.params;
    await HiddenMovie.findOneAndDelete({ movieId });
    
    res.json({ 
      success: true,
      message: 'Movie unhidden successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
