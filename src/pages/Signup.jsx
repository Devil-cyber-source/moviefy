import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GoogleLoginButton from '../components/GoogleLoginButton'
import './Auth.css'

function Signup() {
  const [searchParams] = useSearchParams()
  const [signupMethod, setSignupMethod] = useState('email') // 'email', 'phone'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const { signup, loginWithPhone, loginWithGoogleOAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const refCode = searchParams.get('ref')
    if (refCode) {
      setReferralCode(refCode.toUpperCase())
    }
  }, [searchParams])

  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength('')
      return
    }
    
    if (pass.length < 6) {
      setPasswordStrength('weak')
    } else if (pass.length < 8) {
      setPasswordStrength('medium')
    } else if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      setPasswordStrength('strong')
    } else {
      setPasswordStrength('medium')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!email) {
      setError('Please enter your email')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const result = signup(email, password, name, referralCode || null)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  const handleGoogleSuccess = (googleUser) => {
    setError('')
    try {
      console.log('Google signup successful, user info:', googleUser)
      const result = loginWithGoogleOAuth(googleUser)
      if (result && result.success) {
        navigate('/')
      } else {
        setError(result?.error || 'Google signup failed')
      }
    } catch (err) {
      console.error('Google signup error:', err)
      setError('Google signup error: ' + err.message)
    }
  }

  const handleGoogleError = (error) => {
    console.error('Google OAuth error:', error)
    
    // If Google is not configured, use demo mode
    if (error.error === 'google_not_configured') {
      console.log('Google not configured, using demo mode')
      // Create a demo Google user
      const demoGoogleUser = {
        email: `google.user.${Date.now()}@gmail.com`,
        name: 'Google User',
        picture: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff',
        sub: 'google_demo_' + Date.now()
      }
      handleGoogleSuccess(demoGoogleUser)
      return
    }
    
    if (error.error === 'popup_closed_by_user') {
      setError('Signup cancelled. Please try again.')
    } else {
      setError('Google signup failed. Please try again.')
    }
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    setError('')
    
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    
    setOtpSent(true)
    setError('OTP sent to your phone! (Demo: use 123456)')
  }

  const handlePhoneSignup = (e) => {
    e.preventDefault()
    setError('')
    
    const result = loginWithPhone(phone, otp)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1 className="auth-logo">MOVIEFY</h1>
      </div>
      
      <div className="auth-container">
        <div className="auth-form">
          <h2>Sign Up</h2>
          
          {error && <div className="auth-error">{error}</div>}
          
          {/* Google Signup Button */}
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          {/* Signup Method Tabs */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab ${signupMethod === 'email' ? 'active' : ''}`}
              onClick={() => {
                setSignupMethod('email')
                setError('')
                setOtpSent(false)
              }}
            >
              Email
            </button>
            <button 
              type="button"
              className={`auth-tab ${signupMethod === 'phone' ? 'active' : ''}`}
              onClick={() => {
                setSignupMethod('phone')
                setError('')
                setOtpSent(false)
              }}
            >
              Phone
            </button>
          </div>

          {/* Email Signup Form */}
          {signupMethod === 'email' && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  checkPasswordStrength(e.target.value)
                }}
                required
              />
              
              {password && (
                <div className="password-strength">
                  <div className="strength-label">Password Strength:</div>
                  <div className={`strength-bar strength-${passwordStrength}`}>
                    <div className="strength-fill"></div>
                  </div>
                  <div className={`strength-text strength-${passwordStrength}`}>
                    {passwordStrength === 'weak' && '⚠️ Weak'}
                    {passwordStrength === 'medium' && '✓ Medium'}
                    {passwordStrength === 'strong' && '✓✓ Strong'}
                  </div>
                </div>
              )}

              {!password && (
                <div className="password-requirements">
                  <ul>
                    <li>At least 6 characters</li>
                    <li>Mix of letters and numbers (recommended)</li>
                    <li>Include uppercase letters (recommended)</li>
                  </ul>
                </div>
              )}

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
              {confirmPassword && password !== confirmPassword && (
                <div style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '-10px', marginBottom: '10px' }}>
                  ⚠️ Passwords do not match
                </div>
              )}

              {confirmPassword && password === confirmPassword && (
                <div style={{ fontSize: '12px', color: '#28a745', marginTop: '-10px', marginBottom: '10px' }}>
                  ✓ Passwords match
                </div>
              )}
              
              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              />
              {referralCode && (
                <div style={{ fontSize: '12px', color: '#28a745', marginTop: '-10px', marginBottom: '10px' }}>
                  ✓ Referral code applied! You'll get bonus rewards.
                </div>
              )}
              
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
          )}

          {/* Phone Signup Form */}
          {signupMethod === 'phone' && (
            <form onSubmit={otpSent ? handlePhoneSignup : handleSendOTP}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={otpSent}
              />
              
              <input
                type="tel"
                placeholder="Phone Number (e.g., +1234567890)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={otpSent}
              />
              
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                />
              )}
              
              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                disabled={otpSent}
              />
              {referralCode && (
                <div style={{ fontSize: '12px', color: '#28a745', marginTop: '-10px', marginBottom: '10px' }}>
                  ✓ Referral code applied! You'll get bonus rewards.
                </div>
              )}
              
              <button type="submit" className="auth-button">
                {otpSent ? 'Verify OTP & Sign Up' : 'Send OTP'}
              </button>
              
              {otpSent && (
                <button 
                  type="button" 
                  className="auth-link-button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtp('')
                  }}
                >
                  Change phone number
                </button>
              )}
            </form>
          )}
          
          <div className="auth-signup">
            Already have an account? <Link to="/login">Sign in now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
