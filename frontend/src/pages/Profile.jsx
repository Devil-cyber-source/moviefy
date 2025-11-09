import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

function Profile() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const copyReferralCode = () => {
    const code = currentUser?.referral?.code
    if (code) {
      navigator.clipboard.writeText(code)
      alert('Referral code copied to clipboard!')
    }
  }

  const copyReferralLink = () => {
    const code = currentUser?.referral?.code
    if (code) {
      const link = `${window.location.origin}/signup?ref=${code}`
      navigator.clipboard.writeText(link)
      alert('Referral link copied to clipboard!')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="logo" onClick={() => navigate('/')}>MOVIEFY</h1>
        <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
      </div>

      <div className="profile-container">
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              <p>{currentUser?.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{currentUser?.email}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(currentUser?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="info-item">
              <label>Account Type</label>
              <p className="role-badge">{currentUser?.role?.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Subscription Details</h2>
          <div className="subscription-info">
            <div className="sub-card">
              <h3>{currentUser?.subscription?.plan?.toUpperCase() || 'FREE TRIAL'}</h3>
              <p className={`status ${currentUser?.subscription?.status}`}>
                {currentUser?.subscription?.status?.toUpperCase()}
              </p>
              <p>Valid until: {new Date(currentUser?.subscription?.endDate).toLocaleDateString()}</p>
              <button onClick={() => navigate('/subscription')} className="btn-manage">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Referral Program</h2>
          <div className="referral-card">
            <div className="referral-code-box">
              <label>Your Referral Code</label>
              <div className="code-display">
                <span className="code">{currentUser?.referral?.code || 'N/A'}</span>
                <button onClick={copyReferralCode} className="btn-copy">Copy Code</button>
              </div>
            </div>
            <div className="referral-code-box">
              <label>Your Referral Link</label>
              <div className="code-display">
                <span className="link">{window.location.origin}/signup?ref={currentUser?.referral?.code || ''}</span>
                <button onClick={copyReferralLink} className="btn-copy">Copy Link</button>
              </div>
            </div>
            <div className="referral-stats">
              <div className="stat">
                <h3>{currentUser?.referral?.referredUsers?.length || 0}</h3>
                <p>Friends Referred</p>
              </div>
              <div className="stat">
                <h3>{currentUser?.referral?.rewards || 0}</h3>
                <p>Free Months Available</p>
              </div>
              <div className="stat">
                <h3>{currentUser?.referral?.rewardsEarned || 0}</h3>
                <p>Total Rewards Earned</p>
              </div>
            </div>
            <div className="referral-info">
              <p>🎁 Share your code and earn rewards!</p>
              <p><strong>Get 1 month FREE for every 3 friends who buy a subscription</strong></p>
              {currentUser?.referral?.rewards > 0 && (
                <p className="reward-available">
                  ✨ You have {currentUser.referral.rewards} free month{currentUser.referral.rewards > 1 ? 's' : ''} available! 
                  Apply on your next subscription purchase.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>My List</h2>
          <p className="list-count">
            {currentUser?.myList?.length || 0} movies in your list
          </p>
        </div>

        <div className="profile-actions">
          <button 
            onClick={() => navigate('/change-password')} 
            className="btn-secondary"
          >
            🔐 Change Password
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
