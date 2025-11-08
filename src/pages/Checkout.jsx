import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

function Checkout() {
  const { currentUser, updateSubscription } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedPlan = location.state?.plan || 'basic'

  console.log('Checkout loaded with plan:', selectedPlan)
  console.log('Location state:', location.state)

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [showUpiConfirmation, setShowUpiConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    upiMethod: 'id', // 'id' or 'qr'
    walletType: 'paytm'
  })

  const planDetails = {
    basic: { name: 'Basic', price: 8.99, features: ['1 Device', 'HD Quality'] },
    standard: { name: 'Standard', price: 13.99, features: ['2 Devices', 'Full HD'] },
    premium: { name: 'Premium', price: 17.99, features: ['4 Devices', 'Ultra HD + HDR'] }
  }

  const plan = planDetails[selectedPlan]

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '')
    if (value.length <= 16) {
      value = value.match(/.{1,4}/g)?.join(' ') || value
      setFormData({ ...formData, cardNumber: value })
    }
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2)
      }
      setFormData({ ...formData, expiryDate: value })
    }
  }

  const handleDemoPayment = () => {
    // Demo payment for testing without Razorpay keys
    setTimeout(() => {
      const bonusMonths = currentUser?.referral?.rewards || 0;
      updateSubscription(selectedPlan);
      setProcessing(false);
      
      let message = '✅ Payment Successful! (DEMO MODE)\n\n';
      message += '💳 Transaction ID: DEMO' + Math.random().toString(36).substring(2, 12).toUpperCase() + '\n';
      message += '💰 Amount: $' + (plan.price * 1.18).toFixed(2) + '\n';
      message += '🎬 Plan: ' + plan.name + '\n\n';
      message += '🎉 Your subscription is now active!';
      
      if (bonusMonths > 0) {
        message += `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added from referral rewards!`;
      }
      
      message += '\n\n⚠️ This is DEMO mode. To accept real payments:';
      message += '\n1. Sign up at razorpay.com';
      message += '\n2. Get API keys';
      message += '\n3. Add to backend/.env';
      
      alert(message);
      navigate('/');
    }, 2000);
  };

  const handleRazorpayPayment = async () => {
    setProcessing(true);

    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        console.error('Razorpay not loaded');
        // Fallback to demo mode
        handleDemoPayment();
        return;
      }

      // Get auth token (optional for demo mode)
      const token = localStorage.getItem('token');
      
      // Try to create order on backend
      let data = null;
      
      try {
        const response = await fetch('http://localhost:5000/api/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({
            amount: plan.price * 1.18, // Including tax
            plan: selectedPlan,
            currency: 'INR'
          })
        });

        data = await response.json();
      } catch (error) {
        console.log('Backend not available, using demo mode');
      }

      if (!data || !data.success) {
        console.log('Order creation failed or backend not configured, using demo mode');
        // Fallback to demo mode
        handleDemoPayment();
        return;
      }

      // Razorpay options
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Moviefy',
        description: `${plan.name} Plan Subscription`,
        order_id: data.order.id,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: selectedPlan
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Update subscription
              const bonusMonths = currentUser?.referral?.rewards || 0;
              updateSubscription(selectedPlan);
              
              alert(`✅ Payment Successful!\n\n💳 Payment ID: ${response.razorpay_payment_id}\n🎬 Plan: ${plan.name}\n\n🎉 Your subscription is now active!${bonusMonths > 0 ? `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added!` : ''}`);
              
              navigate('/');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            alert('❌ Payment verification failed. Please contact support.');
            console.error(error);
          }
          setProcessing(false);
        },
        prefill: {
          name: currentUser?.name || '',
          email: currentUser?.email || '',
        },
        notes: {
          plan: selectedPlan,
          userId: currentUser?.id
        },
        theme: {
          color: '#e50914'
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            alert('Payment cancelled');
          }
        }
      };

      // Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      // Fallback to demo mode if Razorpay fails
      alert('⚠️ Razorpay not configured. Using DEMO mode.\n\nTo enable real payments:\n1. Get keys from razorpay.com\n2. Add to backend/.env\n3. Restart backend');
      handleDemoPayment();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Use Razorpay for all payments
    handleRazorpayPayment();
    return;
    
    // Old demo code below (kept for reference)
    // For UPI ID payment, show confirmation screen first
    if (paymentMethod === 'upi' && formData.upiMethod === 'id' && !showUpiConfirmation) {
      setShowUpiConfirmation(true)
      return
    }
    
    setProcessing(true)

    // Simulate realistic payment processing with notifications
    if (paymentMethod === 'upi' && formData.upiMethod === 'id') {
      // Step 1: Sending payment request
      setTimeout(() => {
        alert('📱 Payment request sent to ' + formData.upiId + '\n\n⏳ Please check your UPI app and approve the payment.\n\n(This is a DEMO - simulating real UPI flow)')
      }, 500)
      
      // Step 2: Waiting for approval
      setTimeout(() => {
        alert('⏳ Waiting for payment approval...\n\nIn a real app, you would:\n1. Open your UPI app (Paytm/PhonePe/GPay)\n2. See a payment request notification\n3. Enter your UPI PIN\n4. Approve the payment\n\n(Simulating approval in 3 seconds...)')
      }, 2000)
      
      // Step 3: Payment approved
      setTimeout(() => {
        const bonusMonths = currentUser?.referral?.rewards || 0
        updateSubscription(selectedPlan)
        setProcessing(false)
        
        let message = '✅ Payment Approved!\n\n'
        message += '💳 Transaction ID: UPI' + Math.random().toString(36).substring(2, 12).toUpperCase() + '\n'
        message += '💰 Amount: ₹' + (plan.price * 1.18 * 83).toFixed(2) + '\n'
        message += '📱 UPI ID: ' + formData.upiId + '\n'
        message += '🎬 Plan: ' + plan.name + '\n\n'
        message += '🎉 Your subscription is now active!'
        
        if (bonusMonths > 0) {
          message += `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added from referral rewards!`
        }
        
        message += '\n\n(This was a DEMO payment - no real money was charged)'
        
        alert(message)
        navigate('/')
      }, 5000)
    } else if (paymentMethod === 'upi' && formData.upiMethod === 'qr') {
      // QR Code payment simulation
      setTimeout(() => {
        alert('📷 Waiting for QR code scan...\n\n⏳ Please scan the QR code with your UPI app\n\n(This is a DEMO - simulating QR scan in 3 seconds...)')
      }, 500)
      
      setTimeout(() => {
        const bonusMonths = currentUser?.referral?.rewards || 0
        updateSubscription(selectedPlan)
        setProcessing(false)
        
        let message = '✅ Payment Successful!\n\n'
        message += '💳 Transaction ID: QR' + Math.random().toString(36).substring(2, 12).toUpperCase() + '\n'
        message += '💰 Amount: ₹' + (plan.price * 1.18 * 83).toFixed(2) + '\n'
        message += '📱 Method: QR Code Scan\n'
        message += '🎬 Plan: ' + plan.name + '\n\n'
        message += '🎉 Your subscription is now active!'
        
        if (bonusMonths > 0) {
          message += `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added from referral rewards!`
        }
        
        message += '\n\n(This was a DEMO payment - no real money was charged)'
        
        alert(message)
        navigate('/')
      }, 3500)
    } else if (paymentMethod === 'card') {
      // Card payment simulation
      setTimeout(() => {
        alert('🔐 Verifying card details...\n\n⏳ Please wait\n\n(This is a DEMO - simulating card verification...)')
      }, 500)
      
      setTimeout(() => {
        alert('📱 OTP sent to your registered mobile number\n\nEnter OTP: ******\n\n(This is a DEMO - auto-verifying OTP...)')
      }, 2000)
      
      setTimeout(() => {
        const bonusMonths = currentUser?.referral?.rewards || 0
        updateSubscription(selectedPlan)
        setProcessing(false)
        
        let message = '✅ Payment Successful!\n\n'
        message += '💳 Transaction ID: CARD' + Math.random().toString(36).substring(2, 12).toUpperCase() + '\n'
        message += '💰 Amount: $' + (plan.price * 1.18).toFixed(2) + '\n'
        message += '💳 Card: **** **** **** ' + formData.cardNumber.slice(-4) + '\n'
        message += '🎬 Plan: ' + plan.name + '\n\n'
        message += '🎉 Your subscription is now active!'
        
        if (bonusMonths > 0) {
          message += `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added from referral rewards!`
        }
        
        message += '\n\n(This was a DEMO payment - no real money was charged)'
        
        alert(message)
        navigate('/')
      }, 4000)
    } else {
      // Wallet payment simulation
      setTimeout(() => {
        alert('📱 Redirecting to ' + formData.walletType + '...\n\n⏳ Please complete payment in the wallet app\n\n(This is a DEMO - simulating wallet payment...)')
      }, 500)
      
      setTimeout(() => {
        const bonusMonths = currentUser?.referral?.rewards || 0
        updateSubscription(selectedPlan)
        setProcessing(false)
        
        let message = '✅ Payment Successful!\n\n'
        message += '💳 Transaction ID: WALLET' + Math.random().toString(36).substring(2, 12).toUpperCase() + '\n'
        message += '💰 Amount: ₹' + (plan.price * 1.18 * 83).toFixed(2) + '\n'
        message += '💼 Wallet: ' + formData.walletType.toUpperCase() + '\n'
        message += '🎬 Plan: ' + plan.name + '\n\n'
        message += '🎉 Your subscription is now active!'
        
        if (bonusMonths > 0) {
          message += `\n\n✨ Bonus: ${bonusMonths} free month${bonusMonths > 1 ? 's' : ''} added from referral rewards!`
        }
        
        message += '\n\n(This was a DEMO payment - no real money was charged)'
        
        alert(message)
        navigate('/')
      }, 3000)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="logo" onClick={() => navigate('/')}>MOVIEFY</h1>
        <button onClick={() => navigate('/subscription')} className="btn-back">
          ← Back
        </button>
      </div>

      <div className="checkout-container">
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="plan-details">
              <div className="plan-header">
                <h3>{plan.name} Plan</h3>
                <span className="plan-badge">Monthly</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${plan.price}</span>
                </div>
                <div className="price-row">
                  <span>Tax (18%)</span>
                  <span>${(plan.price * 0.18).toFixed(2)}</span>
                </div>
                {currentUser?.referral?.rewards > 0 && (
                  <div className="price-row bonus">
                    <span>🎁 Referral Bonus</span>
                    <span>+{currentUser.referral.rewards} month{currentUser.referral.rewards > 1 ? 's' : ''} FREE</span>
                  </div>
                )}
                <div className="price-row total">
                  <span>Total</span>
                  <span>${(plan.price * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment Method</h2>
            
            <div className="payment-methods">
              <button
                className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                Credit/Debit Card
              </button>
              <button
                className={`payment-method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                </svg>
                UPI
              </button>
              <button
                className={`payment-method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                Wallet
              </button>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              {paymentMethod === 'card' && (
                <>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                    <div className="card-icons">
                      <span className="card-brand">
                        <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                          <rect width="40" height="25" rx="3" fill="#1434CB"/>
                          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VISA</text>
                        </svg>
                      </span>
                      <span className="card-brand">
                        <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                          <rect width="40" height="25" rx="3" fill="#EB001B"/>
                          <circle cx="15" cy="12.5" r="8" fill="#FF5F00" opacity="0.8"/>
                          <circle cx="25" cy="12.5" r="8" fill="#F79E1B" opacity="0.8"/>
                        </svg>
                      </span>
                      <span className="card-brand">
                        <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                          <rect width="40" height="25" rx="3" fill="#006FCF"/>
                          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AMEX</text>
                        </svg>
                      </span>
                      <span className="card-brand">
                        <svg width="40" height="25" viewBox="0 0 40 25" fill="none">
                          <rect width="40" height="25" rx="3" fill="#00579F"/>
                          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">RUPAY</text>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength="3"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'upi' && (
                <>
                  <div className="upi-tabs">
                    <button
                      type="button"
                      className={`upi-tab ${formData.upiMethod === 'id' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, upiMethod: 'id' })}
                    >
                      📱 UPI ID
                    </button>
                    <button
                      type="button"
                      className={`upi-tab ${formData.upiMethod === 'qr' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, upiMethod: 'qr' })}
                    >
                      📷 Scan QR Code
                    </button>
                  </div>

                  {formData.upiMethod === 'id' ? (
                    showUpiConfirmation ? (
                      <div className="upi-confirmation">
                        <div className="confirmation-card">
                          <div className="confirmation-icon">📱</div>
                          <h3>UPI Payment Request</h3>
                          <div className="payment-details">
                            <div className="detail-row">
                              <span>UPI ID:</span>
                              <strong>{formData.upiId}</strong>
                            </div>
                            <div className="detail-row">
                              <span>Amount:</span>
                              <strong className="amount">₹{(plan.price * 1.18 * 83).toFixed(2)}</strong>
                            </div>
                            <div className="detail-row">
                              <span>Merchant:</span>
                              <strong>Moviefy</strong>
                            </div>
                            <div className="detail-row">
                              <span>Plan:</span>
                              <strong>{plan.name}</strong>
                            </div>
                          </div>
                          <div className="confirmation-message">
                            <p>⚠️ A payment request will be sent to your UPI app</p>
                            <p>Please approve the payment in your UPI app to complete the transaction</p>
                          </div>
                          <div className="confirmation-actions">
                            <button 
                              type="button" 
                              onClick={() => setShowUpiConfirmation(false)}
                              className="btn-back-edit"
                            >
                              ← Edit UPI ID
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="form-group">
                        <label>UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          value={formData.upiId}
                          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                          required
                        />
                        <p className="help-text">Enter your UPI ID (e.g., 9876543210@paytm)</p>
                      </div>
                    )
                  ) : (
                    <div className="qr-code-section">
                      <div className="qr-code-container">
                        <div className="qr-code">
                          <svg viewBox="0 0 200 200" width="200" height="200">
                            <rect width="200" height="200" fill="white"/>
                            {/* QR Code Pattern */}
                            <rect x="10" y="10" width="60" height="60" fill="black"/>
                            <rect x="20" y="20" width="40" height="40" fill="white"/>
                            <rect x="30" y="30" width="20" height="20" fill="black"/>
                            
                            <rect x="130" y="10" width="60" height="60" fill="black"/>
                            <rect x="140" y="20" width="40" height="40" fill="white"/>
                            <rect x="150" y="30" width="20" height="20" fill="black"/>
                            
                            <rect x="10" y="130" width="60" height="60" fill="black"/>
                            <rect x="20" y="140" width="40" height="40" fill="white"/>
                            <rect x="30" y="150" width="20" height="20" fill="black"/>
                            
                            {/* Data pattern */}
                            <rect x="90" y="90" width="20" height="20" fill="black"/>
                            <rect x="80" y="100" width="10" height="10" fill="black"/>
                            <rect x="100" y="80" width="10" height="10" fill="black"/>
                            <rect x="110" y="90" width="10" height="10" fill="black"/>
                            <rect x="90" y="110" width="10" height="10" fill="black"/>
                            
                            {/* Additional pattern */}
                            <rect x="80" y="30" width="10" height="10" fill="black"/>
                            <rect x="90" y="40" width="10" height="10" fill="black"/>
                            <rect x="100" y="30" width="10" height="10" fill="black"/>
                            <rect x="110" y="40" width="10" height="10" fill="black"/>
                            
                            <rect x="30" y="80" width="10" height="10" fill="black"/>
                            <rect x="40" y="90" width="10" height="10" fill="black"/>
                            <rect x="50" y="80" width="10" height="10" fill="black"/>
                            <rect x="60" y="90" width="10" height="10" fill="black"/>
                            
                            <rect x="130" y="80" width="10" height="10" fill="black"/>
                            <rect x="140" y="90" width="10" height="10" fill="black"/>
                            <rect x="150" y="80" width="10" height="10" fill="black"/>
                            <rect x="160" y="90" width="10" height="10" fill="black"/>
                            
                            <rect x="80" y="130" width="10" height="10" fill="black"/>
                            <rect x="90" y="140" width="10" height="10" fill="black"/>
                            <rect x="100" y="130" width="10" height="10" fill="black"/>
                            <rect x="110" y="140" width="10" height="10" fill="black"/>
                          </svg>
                        </div>
                        <div className="qr-info">
                          <p className="qr-amount">₹{(plan.price * 1.18 * 83).toFixed(2)}</p>
                          <p className="qr-merchant">Moviefy Subscription</p>
                          <p className="qr-instruction">Scan with any UPI app to pay</p>
                        </div>
                      </div>
                      
                      <div className="upi-apps">
                        <p>Supported UPI Apps:</p>
                        <div className="upi-app-icons">
                          <div className="upi-app">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                              <rect width="40" height="40" rx="8" fill="#00BAF2"/>
                              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Paytm</text>
                            </svg>
                          </div>
                          <div className="upi-app">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                              <rect width="40" height="40" rx="8" fill="#5F259F"/>
                              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PhonePe</text>
                            </svg>
                          </div>
                          <div className="upi-app">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                              <rect width="40" height="40" rx="8" fill="#4285F4"/>
                              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">GPay</text>
                            </svg>
                          </div>
                          <div className="upi-app">
                            <svg width="40" height="40" viewBox="0 0 40 40">
                              <rect width="40" height="40" rx="8" fill="#002970"/>
                              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">BHIM</text>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="qr-steps">
                        <h4>How to pay:</h4>
                        <ol>
                          <li>Open any UPI app on your phone</li>
                          <li>Tap on "Scan QR Code"</li>
                          <li>Scan the QR code above</li>
                          <li>Verify amount and complete payment</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </>
              )}

              {paymentMethod === 'wallet' && (
                <div className="wallet-options">
                  <label>Select Wallet</label>
                  <div className="wallet-grid">
                    <button
                      type="button"
                      className={`wallet-btn ${formData.walletType === 'paytm' ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, walletType: 'paytm' })}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="#00BAF2"/>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Paytm</text>
                      </svg>
                      <span>Paytm</span>
                    </button>
                    <button
                      type="button"
                      className={`wallet-btn ${formData.walletType === 'phonepe' ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, walletType: 'phonepe' })}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="#5F259F"/>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PhonePe</text>
                      </svg>
                      <span>PhonePe</span>
                    </button>
                    <button
                      type="button"
                      className={`wallet-btn ${formData.walletType === 'googlepay' ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, walletType: 'googlepay' })}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="#4285F4"/>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GPay</text>
                      </svg>
                      <span>Google Pay</span>
                    </button>
                    <button
                      type="button"
                      className={`wallet-btn ${formData.walletType === 'amazonpay' ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, walletType: 'amazonpay' })}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="#FF9900"/>
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Amazon</text>
                      </svg>
                      <span>Amazon Pay</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="security-info">
                <span>🔒</span>
                <p>Your payment information is encrypted and secure</p>
              </div>

              <button type="submit" className="btn-pay" disabled={processing}>
                {processing ? (
                  <>
                    <span className="spinner"></span>
                    {paymentMethod === 'upi' ? 'Sending Payment Request...' : 'Processing...'}
                  </>
                ) : paymentMethod === 'upi' && formData.upiMethod === 'qr' ? (
                  '✅ I have completed the payment'
                ) : paymentMethod === 'upi' && formData.upiMethod === 'id' && showUpiConfirmation ? (
                  '📱 Send Payment Request'
                ) : (
                  `Pay $${(plan.price * 1.18).toFixed(2)}`
                )}
              </button>
            </form>

            <div className="payment-footer">
              <p>By confirming your subscription, you allow Moviefy to charge your payment method for this payment and future payments in accordance with their terms.</p>
              {currentUser?.referral?.rewards > 0 && (
                <p className="bonus-note">
                  🎁 Your {currentUser.referral.rewards} free month{currentUser.referral.rewards > 1 ? 's' : ''} will be automatically applied after this purchase!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
