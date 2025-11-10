import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'
import movieRoutes from './routes/movies.js'
import uploadRoutes from './routes/upload.js'
import userRoutes from './routes/users.js'
import paymentRoutes from './routes/payment.js'
import phoneAuthRoutes from './routes/phoneAuth.js'
import hiddenMoviesRoutes from './routes/hiddenMovies.js'
import User from './models/User.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in development
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded videos and static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Connect to MongoDB
connectDB()

// Initialize default admin user
const initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@moviefy.com' })
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@moviefy.com',
        password: 'admin123',
        role: 'admin',
        authProvider: 'email',
        subscription: {
          plan: 'premium',
          status: 'active',
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          autoRenew: true
        },
        referral: {
          code: 'ADMIN001',
          hasPurchased: true
        }
      })
      await admin.save()
      console.log('✅ Default admin user created')
    }
  } catch (error) {
    console.error('Error creating admin:', error.message)
  }
}

// Initialize after DB connection
setTimeout(initializeAdmin, 2000)

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Moviefy API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      movies: '/api/movies',
      upload: '/api/upload',
      users: '/api/users',
      payment: '/api/payment'
    }
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/phone', phoneAuthRoutes)
app.use('/api/hidden-movies', hiddenMoviesRoutes)

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await User.countDocuments()
    res.json({ 
      status: 'ok', 
      message: 'Moviefy API is running',
      database: 'MongoDB',
      users: userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection issue',
      error: error.message
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`🌐 Network access: http://0.0.0.0:${PORT}`)
  console.log(`📁 Upload videos at: http://localhost:${PORT}/api/upload/video`)
  console.log(`🔗 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
  console.log(`\n💡 To access from other devices on your network:`)
  console.log(`   Find your IP address and use: http://YOUR_IP:${PORT}`)
})
