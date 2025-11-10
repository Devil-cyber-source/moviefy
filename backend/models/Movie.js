import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String },
  year: { type: Number },
  rating: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  videoQuality: [{
    quality: String, // 360p, 480p, 720p, 1080p
    url: String
  }],
  status: { type: String, enum: ['processing', 'ready', 'failed'], default: 'processing' },
  cloudinaryId: { type: String } // For Cloudinary video storage
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
