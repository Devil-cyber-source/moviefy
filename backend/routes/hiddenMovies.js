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

// Bulk hide movies (admin only)
router.post('/bulk/hide', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { movieIds } = req.body;
    
    if (!movieIds || !Array.isArray(movieIds) || movieIds.length === 0) {
      return res.status(400).json({ error: 'movieIds array is required' });
    }
    
    console.log('🗑️ Bulk hiding movies:', movieIds.length, movieIds);
    
    // Separate ObjectIds from numeric IDs
    const objectIds = [];
    const numericIds = [];
    
    for (const id of movieIds) {
      const idStr = String(id);
      // Check if it's a valid MongoDB ObjectId (24 hex characters)
      if (/^[0-9a-fA-F]{24}$/.test(idStr)) {
        objectIds.push(idStr);
      } else {
        numericIds.push(idStr);
      }
    }
    
    console.log('📊 ObjectIds:', objectIds.length, 'Numeric IDs:', numericIds.length);
    
    // Try to delete from database (only ObjectIds)
    let dbDeleteCount = 0;
    if (objectIds.length > 0) {
      try {
        const dbDeleteResult = await Movie.deleteMany({ _id: { $in: objectIds } });
        dbDeleteCount = dbDeleteResult.deletedCount;
        console.log('✅ Deleted from database:', dbDeleteCount);
      } catch (err) {
        console.log('⚠️ Database delete error:', err.message);
      }
    }
    
    // Add all to hidden movies list (both ObjectIds and numeric IDs)
    const hiddenMovies = [];
    for (const movieId of movieIds) {
      const hiddenMovie = await HiddenMovie.findOneAndUpdate(
        { movieId: String(movieId) },
        { 
          movieId: String(movieId),
          deletedBy: req.user.id,
          deletedAt: new Date()
        },
        { upsert: true, new: true }
      );
      hiddenMovies.push(hiddenMovie);
    }
    
    console.log('✅ Bulk hide complete. Total hidden:', await HiddenMovie.countDocuments());
    
    res.json({ 
      success: true,
      message: `${movieIds.length} movies hidden successfully`,
      count: movieIds.length,
      databaseDeleted: dbDeleteCount,
      staticHidden: numericIds.length,
      hiddenMovies 
    });
  } catch (error) {
    console.error('❌ Bulk hide error:', error);
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
