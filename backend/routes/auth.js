import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '30d' }
  )
}

// Register with Email
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide name, email, and password' 
      })
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Password must be at least 6 characters' 
      })
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'Email already registered' 
      })
    }

    // Generate unique referral code
    const userReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      authProvider: 'email',
      referral: {
        code: userReferralCode,
        referredBy: referralCode || null
      }
    })

    await user.save()

    // Update referrer if referral code provided
    if (referralCode) {
      const referrer = await User.findOne({ 'referral.code': referralCode })
      if (referrer) {
        referrer.referral.referredUsers.push(user._id)
        referrer.referral.rewards += 1
        await referrer.save()
      }
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    const token = generateToken(user)

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON()
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

// Login with Email
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide email and password' 
      })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    const token = generateToken(user)

    res.json({
      success: true,
      token,
      user: user.toJSON()
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

// Google OAuth Login/Register
router.post('/google', async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body

    if (!email || !googleId) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid Google user data' 
      })
    }

    // Check if user exists
    let user = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { googleId: googleId }
      ]
    })

    if (user) {
      // Update existing user
      user.lastLogin = new Date()
      if (!user.googleId) {
        user.googleId = googleId
      }
      if (!user.picture && picture) {
        user.picture = picture
      }
      await user.save()
    } else {
      // Create new user
      const userReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase()
      
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        picture,
        googleId,
        authProvider: 'google',
        referral: {
          code: userReferralCode
        }
      })

      await user.save()
    }

    const token = generateToken(user)

    res.json({
      success: true,
      token,
      user: user.toJSON()
    })
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

// Phone OTP Login/Register
router.post('/phone', async (req, res) => {
  try {
    const { phone, otp } = req.body

    if (!phone || !otp) {
      return res.status(400).json({ 
        success: false,
        error: 'Phone and OTP required' 
      })
    }

    // In production, verify OTP with SMS service
    // For demo, accept 123456
    if (otp !== '123456') {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid OTP' 
      })
    }

    // Check if user exists
    let user = await User.findOne({ phone })

    if (user) {
      // Update existing user
      user.lastLogin = new Date()
      await user.save()
    } else {
      // Create new user
      const userReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase()
      
      user = new User({
        name: 'Phone User',
        email: `${phone}@moviefy.phone`,
        phone,
        authProvider: 'phone',
        referral: {
          code: userReferralCode
        }
      })

      await user.save()
    }

    const token = generateToken(user)

    res.json({
      success: true,
      token,
      user: user.toJSON()
    })
  } catch (error) {
    console.error('Phone auth error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key')
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      })
    }

    res.json({
      success: true,
      user: user.toJSON()
    })
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    })
  }
})

// Change password
router.post('/change-password', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key')
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      })
    }

    const { currentPassword, newPassword } = req.body

    // Validation
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters'
      })
    }

    // If user has a password (email login), verify current password
    if (user.password) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          error: 'Current password is required'
        })
      }

      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Current password is incorrect'
        })
      }
    }

    // Update password
    user.password = newPassword
    user.authProvider = 'email' // Now they can login with email
    await user.save()

    res.json({
      success: true,
      message: 'Password updated successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    })
  }
})

export default router
