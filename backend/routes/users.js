import express from 'express';
import db from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to my list
router.post('/mylist/:movieId', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (!user.myList.includes(req.params.movieId)) {
      user.myList.push(req.params.movieId);
      await db.write();
    }
    res.json({ message: 'Added to list' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from my list
router.delete('/mylist/:movieId', authMiddleware, async (req, res) => {
  try {
    await db.read();
    const user = db.data.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.myList = user.myList.filter(id => id !== req.params.movieId);
    await db.write();
    res.json({ message: 'Removed from list' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
