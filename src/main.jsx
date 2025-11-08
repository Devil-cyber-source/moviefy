import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import './index.css'
import './colors.css'
import './animations.css'

// Import database viewer utility (available in console as 'db')
import { db } from './utils/databaseViewer'
window.db = db

// Google OAuth Client ID from environment variable
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Initialize demo users
const initDemoUsers = () => {
  const users = localStorage.getItem('users')
  if (!users) {
    const demoUsers = [
      {
        id: 1,
        email: 'admin@moviefy.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        myList: [],
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
          plan: 'free',
          status: 'trial',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: false
        },
        referral: {
          code: 'DEMO2024',
          referredBy: null,
          referredUsers: [],
          rewards: 0,
          rewardsEarned: 0,
          hasPurchased: false
        },
        createdAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('users', JSON.stringify(demoUsers))
  }
}

initDemoUsers()

// Wrap with GoogleOAuthProvider only if Client ID is available
const AppWrapper = GOOGLE_CLIENT_ID ? (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </GoogleOAuthProvider>
) : (
  <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {AppWrapper}
  </React.StrictMode>,
)
