import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GoogleLoginButton from '../components/GoogleLoginButton'
import './Auth.css'

function Login() {
  const [loginMethod, setLoginMethod] = useState('email') // 'email', 'phone'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const { login, loginWithPhone, loginWithGoogleOAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  const handleGoogleSuccess = (googleUser) => {
    setError('')
    try {
      console.log('Google login successful, user info:', googleUser)
      const result = loginWithGoogleOAuth(googleUser)
      if (result && result.success) {
        navigate('/')
      } else {
        setError(result?.error || 'Google login failed')
      }
    } catch (err) {
      console.error('Google login error:', err)
      setError('Google login error: ' + err.message)
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
      setError('Login cancelled. Please try again.')
    } else {
      setError('Google login failed. Please try again.')
    }
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    setError('')
    
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    
    // Simulate OTP sending
    setOtpSent(true)
    setError('OTP sent to your phone! (Demo: use 123456)')
  }

  const handlePhoneLogin = (e) => {
    e.preventDefault()
    setError('')
    
    const result = loginWithPhone(phone, otp)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  const resetDemoData = () => {
    const defaultUsers = [
      {
        id: 1,
        email: 'admin@moviefy.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        myList: [],
        subscription: {
          plan: 'premium',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true
        },
        referral: {
          code: 'ADMIN001',
          referredBy: null,
          referredUsers: [],
          rewards: 0,
          rewardsEarned: 0,
          hasPurchased: true
        },
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        email: 'user@moviefy.com',
        password: 'user123',
        name: 'Demo User',
        role: 'user',
        myList: [],
        subscription: {
          plan: 'standard',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true
        },
        referral: {
          code: 'USER001',
          referredBy: null,
          referredUsers: [],
          rewards: 0,
          rewardsEarned: 0,
          hasPurchased: true
        },
        createdAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('users', JSON.stringify(defaultUsers))
    setError('Demo data reset! Try logging in now.')
  }

  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1 className="auth-logo">MOVIEFY</h1>
      </div>
      
      <div className="auth-container">
        <div className="auth-form">
          <h2>Sign In</h2>
          
          {error && <div className="auth-error">{error}</div>}
          
          {/* Google Login Button */}
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          {/* Login Method Tabs */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="auth-tabs">
            <button 
              type="button"
              className={`auth-tab ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => {
                setLoginMethod('email')
                setError('')
                setOtpSent(false)
              }}
            >
              Email
            </button>
            <button 
              type="button"
              className={`auth-tab ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => {
                setLoginMethod('phone')
                setError('')
                setOtpSent(false)
              }}
            >
              Phone
            </button>
          </div>

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button type="submit" className="auth-button">Sign In</button>
              
              <div className="auth-help">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Need help?</a>
              </div>
            </form>
          )}

          {/* Phone Login Form */}
          {loginMethod === 'phone' && (
            <form onSubmit={otpSent ? handlePhoneLogin : handleSendOTP}>
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
              
              <button type="submit" className="auth-button">
                {otpSent ? 'Verify OTP' : 'Send OTP'}
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
            New to Moviefy? <Link to="/signup">Sign up now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
