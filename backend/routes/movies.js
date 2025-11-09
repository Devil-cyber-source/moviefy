import express from 'express';
import Movie from '../models/Movie.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = { status: 'ready' };
    
    if (category) {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    movie.views = (movie.views || 0) + 1;
    await movie.save();
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create movie (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = new Movie({
      ...req.body,
      uploadedBy: req.user.id,
      status: 'ready'
    });
    
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update movie (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete movie (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
