import express from 'express';
import crypto from 'crypto';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Razorpay configuration
// For testing, using test keys (replace with your actual keys)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_DEMO_KEY';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'DEMO_SECRET';

// Create order (auth optional for demo)
router.post('/create-order', async (req, res) => {
  try {
    const { amount, plan, currency = 'INR' } = req.body;

    // For demo purposes, we'll create a mock order
    // In production, you'd use actual Razorpay SDK
    const order = {
      id: 'order_' + crypto.randomBytes(12).toString('hex'),
      entity: 'order',
      amount: Math.round(amount * 100), // Convert to paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency: currency,
      receipt: 'receipt_' + Date.now(),
      status: 'created',
      attempts: 0,
      notes: {
        plan: plan,
        userId: req.user?.id || 'demo'
      },
      created_at: Math.floor(Date.now() / 1000)
    };

    res.json({
      success: true,
      order,
      key: RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Verify payment (auth optional for demo)
router.post('/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      plan 
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified
      // Update user subscription in database
      res.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get payment details
router.get('/payment/:paymentId', authMiddleware, async (req, res) => {
  try {
    // In production, fetch from Razorpay API
    res.json({
      success: true,
      payment: {
        id: req.params.paymentId,
        status: 'captured',
        method: 'card',
        amount: 1499,
        currency: 'INR'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default router;
