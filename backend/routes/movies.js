import express from 'express';
import db from '../db.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    await db.read();
    
    let movies = db.data.movies.filter(m => m.status === 'ready');
    
    if (category) {
      movies = movies.filter(m => m.category === category);
    }
    if (search) {
      movies = movies.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single movie
router.get('/:id', async (req, res) => {
  try {
    await db.read();
    const movie = db.data.movies.find(m => m.id === req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    movie.views = (movie.views || 0) + 1;
    await db.write();
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create movie (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.read();
    const movie = {
      id: Date.now().toString(),
      ...req.body,
      uploadedBy: req.user.id,
      views: 0,
      status: 'ready',
      createdAt: new Date().toISOString()
    };
    
    db.data.movies.push(movie);
    await db.write();
    
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update movie (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.movies.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Movie not found' });
    
    db.data.movies[index] = { ...db.data.movies[index], ...req.body };
    await db.write();
    
    res.json(db.data.movies[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete movie (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.read();
    const index = db.data.movies.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Movie not found' });
    
    db.data.movies.splice(index, 1);
    await db.write();
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
