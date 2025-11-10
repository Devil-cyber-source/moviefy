import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';

dotenv.config();

const updateBaahubali = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find Baahubali movie
    const movie = await Movie.findOne({ 
      title: { $regex: /baahubali/i } 
    });

    if (movie) {
      console.log('Found movie:', movie.title);
      
      // Update with real poster
      movie.poster = 'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjJjNy00NzI3LWI3OWUtNmM2MTAzYzVlNzQxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg';
      movie.backdrop = 'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjJjNy00NzI3LWI3OWUtNmM2MTAzYzVlNzQxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg';
      movie.thumbnail = 'https://m.media-amazon.com/images/M/MV5BYTJlNjlkZTktNjJjNy00NzI3LWI3OWUtNmM2MTAzYzVlNzQxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg';
      
      await movie.save();
      console.log('✅ Updated Baahubali poster!');
    } else {
      console.log('❌ Baahubali movie not found');
    }

    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

updateBaahubali();
