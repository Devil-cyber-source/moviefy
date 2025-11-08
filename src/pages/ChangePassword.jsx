import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import './Profile.css'

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser, changePassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)

    try {
      const result = await changePassword(currentPassword, newPassword)
      
      if (result.success) {
        setSuccess('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        
        // Redirect to profile after 2 seconds
        setTimeout(() => {
          navigate('/profile')
        }, 2000)
      } else {
        setError(result.error || 'Failed to change password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // For users who logged in with Google/Phone and don't have a password
  const needsPasswordCreation = currentUser?.authProvider !== 'email' && !currentUser?.hasPassword

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>{needsPasswordCreation ? 'Create Password' : 'Change Password'}</h1>
          <p>
            {needsPasswordCreation 
              ? 'Create a password to enable email login for your account'
              : 'Update your account password'}
          </p>
        </div>

        <div className="profile-content">
          <form onSubmit={handleSubmit} className="password-form">
            {error && (
              <div className="alert alert-error">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                ✅ {success}
              </div>
            )}

            {!needsPasswordCreation && (
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  disabled={loading}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                disabled={loading}
                required
              />
              <small>Must be at least 6 characters long</small>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/profile')}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : needsPasswordCreation ? 'Create Password' : 'Change Password'}
              </button>
            </div>
          </form>

          <div className="password-tips">
            <h3>Password Tips:</h3>
            <ul>
              <li>✅ Use at least 6 characters</li>
              <li>✅ Mix uppercase and lowercase letters</li>
              <li>✅ Include numbers and special characters</li>
              <li>✅ Don't use common words or patterns</li>
              <li>✅ Don't reuse passwords from other sites</li>
            </ul>
          </div>

          {currentUser?.authProvider !== 'email' && (
            <div className="info-box">
              <h4>ℹ️ About Your Account</h4>
              <p>
                You signed up using <strong>{currentUser.authProvider === 'google' ? 'Google' : 'Phone'}</strong>.
                {needsPasswordCreation 
                  ? ' Creating a password will allow you to login with email as well.'
                  : ' You can still login using your original method.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
