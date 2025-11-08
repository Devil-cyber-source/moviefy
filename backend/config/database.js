import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviefy'
    
    await mongoose.connect(mongoURI)
    
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.name}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    console.log('\n💡 MongoDB is not running. Choose one option:')
    console.log('\n📦 Option 1: Install MongoDB locally')
    console.log('   Windows: https://www.mongodb.com/try/download/community')
    console.log('   Mac: brew install mongodb-community')
    console.log('   Linux: sudo apt-get install mongodb')
    console.log('\n☁️  Option 2: Use MongoDB Atlas (Free Cloud Database)')
    console.log('   1. Go to: https://www.mongodb.com/cloud/atlas/register')
    console.log('   2. Create free cluster')
    console.log('   3. Get connection string')
    console.log('   4. Update MONGODB_URI in backend/.env')
    console.log('\n⚠️  Server will continue without database (limited functionality)')
  }
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('👋 MongoDB connection closed through app termination')
  process.exit(0)
})

export default connectDB
