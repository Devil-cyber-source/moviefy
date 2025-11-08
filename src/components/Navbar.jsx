import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar({ onSearch, onCategoryChange }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleNavClick = (category) => {
    onCategoryChange(category)
    onSearch('')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleAdminClick = () => {
    navigate('/admin')
    setProfileOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo" onClick={() => currentUser?.role === 'admin' ? navigate('/admin') : handleNavClick('all')}>
          MOVIEFY
        </h1>
        {currentUser?.role !== 'admin' && (
          <ul className="nav-links">
            <li onClick={() => handleNavClick('all')}>Home</li>
            <li onClick={() => handleNavClick('trending')}>TV Shows</li>
            <li onClick={() => handleNavClick('action')}>Movies</li>
            <li onClick={() => handleNavClick('drama')}>New & Popular</li>
            <li onClick={() => handleNavClick('mylist')}>My List</li>
          </ul>
        )}
      </div>
      
      <div className="navbar-right">
        {currentUser?.role !== 'admin' && (
          <div className={`search-box ${searchOpen ? 'active' : ''}`}>
            <button onClick={() => setSearchOpen(!searchOpen)}>🔍</button>
            <input 
              type="text" 
              placeholder="Search titles..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        <div className="profile-container">
          <div className="profile" onClick={() => setProfileOpen(!profileOpen)}>
            {currentUser?.name?.charAt(0).toUpperCase() || '👤'}
          </div>
          {profileOpen && (
            <div className="profile-dropdown">
              {currentUser?.role === 'admin' ? (
                // Admin Menu - Only admin functions
                <>
                  <div className="profile-item" onClick={handleAdminClick}>
                    <span>⚙️</span> Admin Dashboard
                  </div>
                  <div className="profile-item profile-signout" onClick={handleLogout}>
                    <span>🚪</span> Sign Out
                  </div>
                </>
              ) : (
                // User Menu - All user functions
                <>
                  <div className="profile-item" onClick={() => { navigate('/profile'); setProfileOpen(false); }}>
                    <span>👤</span> {currentUser?.name}
                  </div>
                  <div className="profile-item" onClick={() => { navigate('/subscription'); setProfileOpen(false); }}>
                    <span>💳</span> Subscription
                  </div>
                  <div className="profile-item" onClick={() => { navigate('/watch-party'); setProfileOpen(false); }}>
                    <span>🎉</span> Watch Party
                  </div>
                  <div className="profile-item">
                    <span>❓</span> Help Center
                  </div>
                  <div className="profile-item profile-signout" onClick={handleLogout}>
                    <span>🚪</span> Sign Out
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
