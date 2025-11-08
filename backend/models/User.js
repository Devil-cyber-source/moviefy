import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String,
    // Not required for Google/Phone auth
    required: function() {
      return this.authProvider === 'email'
    }
  },
  phone: {
    type: String,
    sparse: true,
    unique: true
  },
  picture: {
    type: String,
    default: null
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  authProvider: {
    type: String,
    enum: ['email', 'google', 'phone'],
    default: 'email'
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  subscription: {
    plan: { 
      type: String, 
      enum: ['free', 'basic', 'standard', 'premium'], 
      default: 'free' 
    },
    status: { 
      type: String, 
      enum: ['trial', 'active', 'expired', 'cancelled'], 
      default: 'trial' 
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      default: function() {
        // 30 days trial by default
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    },
    autoRenew: {
      type: Boolean,
      default: false
    }
  },
  referral: {
    code: { 
      type: String, 
      unique: true,
      sparse: true
    },
    referredBy: { 
      type: String,
      default: null
    },
    referredUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    rewards: {
      type: Number,
      default: 0
    },
    rewardsEarned: {
      type: Number,
      default: 0
    },
    hasPurchased: {
      type: Boolean,
      default: false
    }
  },
  myList: [{
    type: Number, // Movie IDs from TMDB
    default: []
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next()
  }
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false
  return await bcrypt.compare(candidatePassword, this.password)
}

// Generate referral code
userSchema.methods.generateReferralCode = function() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

// Remove password from JSON response
userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  return user
}

export default mongoose.model('User', userSchema)
