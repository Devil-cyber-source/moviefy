import express from 'express';
import twilio from 'twilio';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Initialize Twilio client (only if credentials are provided)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    // Check if Twilio is configured
    if (!twilioClient) {
      // Demo mode - return success with demo OTP
      console.log('📱 Demo Mode: OTP for', phone, 'is: 123456');
      return res.json({
        success: true,
        message: 'Demo mode: Use OTP 123456',
        demo: true
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiry (5 minutes)
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // Send OTP via Twilio
    await twilioClient.messages.create({
      body: `Your Moviefy verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log('📱 OTP sent to:', phone);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP'
    });
  }
});

// Verify OTP and login/signup
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone and OTP are required'
      });
    }

    // Check OTP
    const storedData = otpStore.get(phone);
    
    // Demo mode check
    if (!twilioClient && otp === '123456') {
      // Demo mode - allow login
    } else if (!storedData) {
      return res.status(400).json({
        success: false,
        error: 'OTP expired or invalid'
      });
    } else if (storedData.expiresAt < Date.now()) {
      otpStore.delete(phone);
      return res.status(400).json({
        success: false,
        error: 'OTP expired'
      });
    } else if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    // OTP verified - clear it
    otpStore.delete(phone);

    // Find or create user
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new user
      user = new User({
        name: name || `User ${phone.slice(-4)}`,
        phone,
        authProvider: 'phone',
        email: `${phone}@phone.moviefy.com`, // Dummy email
        referral: {
          code: Math.random().toString(36).substring(2, 10).toUpperCase()
        }
      });
      await user.save();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        referral: user.referral
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP'
    });
  }
});

export default router;
