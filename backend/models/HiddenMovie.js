import mongoose from 'mongoose';

const hiddenMovieSchema = new mongoose.Schema({
  movieId: { 
    type: String, 
    required: true,
    unique: true 
  },
  deletedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  deletedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('HiddenMovie', hiddenMovieSchema);
