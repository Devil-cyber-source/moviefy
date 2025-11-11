import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from '../models/Movie.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const checkVideos = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all movies from database
    const movies = await Movie.find({});
    console.log(`📊 Found ${movies.length} movies in database\n`);

    // Check uploads directory
    const uploadsDir = path.join(__dirname, '../uploads/videos');
    let videoFiles = [];
    
    if (fs.existsSync(uploadsDir)) {
      videoFiles = fs.readdirSync(uploadsDir);
      console.log(`📁 Found ${videoFiles.length} video files in uploads/videos/\n`);
    } else {
      console.log('⚠️ uploads/videos/ directory does not exist\n');
    }

    // Check each movie
    console.log('🔍 Checking movies:\n');
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title}`);
      console.log(`   Video URL: ${movie.videoUrl}`);
      
      if (movie.videoUrl && movie.videoUrl.startsWith('/uploads/')) {
        const filename = movie.videoUrl.split('/').pop();
        const exists = videoFiles.includes(filename);
        console.log(`   File exists: ${exists ? '✅ YES' : '❌ NO'}`);
        
        if (exists) {
          const filePath = path.join(uploadsDir, filename);
          const stats = fs.statSync(filePath);
          const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          console.log(`   File size: ${sizeMB} MB`);
        }
      } else {
        console.log(`   Type: External URL (YouTube/Vimeo)`);
      }
      console.log('');
    });

    // Summary
    console.log('📋 Summary:');
    console.log(`   Total movies: ${movies.length}`);
    console.log(`   Video files: ${videoFiles.length}`);
    
    const uploadedMovies = movies.filter(m => m.videoUrl && m.videoUrl.startsWith('/uploads/'));
    const missingFiles = uploadedMovies.filter(m => {
      const filename = m.videoUrl.split('/').pop();
      return !videoFiles.includes(filename);
    });
    
    if (missingFiles.length > 0) {
      console.log(`   ⚠️ Missing files: ${missingFiles.length}`);
      console.log('\n❌ Some movies have missing video files!');
      console.log('   Solution: Delete these movies and re-upload them.');
    } else {
      console.log('   ✅ All video files present!');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkVideos();
