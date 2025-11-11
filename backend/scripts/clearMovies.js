import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';

dotenv.config();

const clearMovies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all movies
    const result = await Movie.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} movies from database`);

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

clearMovies();
