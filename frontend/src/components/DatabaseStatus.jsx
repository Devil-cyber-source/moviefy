import { useState, useEffect } from 'react'
import API_URL from '../config/api'
import './DatabaseStatus.css'

function DatabaseStatus() {
  const [status, setStatus] = useState('checking')
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    checkBackend()
  }, [])

  const checkBackend = async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`)
      const data = await response.json()
      if (data.status === 'ok' && data.database === 'MongoDB') {
        setStatus('connected')
        setShowBanner(false)
      } else {
        setStatus('demo')
        setShowBanner(true)
      }
    } catch (error) {
      setStatus('demo')
      setShowBanner(true)
    }
  }

  if (!showBanner) return null

  return (
    <div className="database-status-banner">
      <div className="banner-content">
        <span className="banner-icon">⚠️</span>
        <div className="banner-text">
          <strong>Demo Mode:</strong> Backend not connected. 
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              window.open('/INSTALL_MONGODB.md', '_blank')
            }}
          >
            Setup MongoDB
          </a>
          to enable real database.
        </div>
        <button 
          className="banner-close"
          onClick={() => setShowBanner(false)}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default DatabaseStatus
