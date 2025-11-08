import { useState, useEffect } from 'react'
import { getAnalytics, clearOldAnalytics } from '../utils/performance'
import './Analytics.css'

function Analytics() {
  const [analytics, setAnalytics] = useState([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    uniqueUsers: 0,
    popularMovies: [],
    userActivity: [],
    deviceTypes: { mobile: 0, tablet: 0, desktop: 0 }
  })

  useEffect(() => {
    loadAnalytics()
    clearOldAnalytics(30) // Keep last 30 days
  }, [])

  const loadAnalytics = () => {
    const data = getAnalytics()
    setAnalytics(data)
    calculateStats(data)
  }

  const calculateStats = (data) => {
    const totalEvents = data.length
    const uniqueUsers = new Set(data.map(e => e.data.userId)).size
    
    // Popular movies
    const movieViews = {}
    data.filter(e => e.event === 'movie_view').forEach(e => {
      const movieId = e.data.movieId
      movieViews[movieId] = (movieViews[movieId] || 0) + 1
    })
    
    const popularMovies = Object.entries(movieViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id, views]) => ({ id, views }))
    
    // User activity by day
    const activityByDay = {}
    data.forEach(e => {
      const date = new Date(e.timestamp).toLocaleDateString()
      activityByDay[date] = (activityByDay[date] || 0) + 1
    })
    
    const userActivity = Object.entries(activityByDay)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .slice(-7) // Last 7 days
    
    // Device types (mock data for demo)
    const deviceTypes = {
      mobile: Math.floor(totalEvents * 0.4),
      tablet: Math.floor(totalEvents * 0.2),
      desktop: Math.floor(totalEvents * 0.4)
    }
    
    setStats({
      totalEvents,
      uniqueUsers,
      popularMovies,
      userActivity,
      deviceTypes
    })
  }

  const getEventIcon = (eventType) => {
    const icons = {
      'movie_view': '🎬',
      'movie_play': '▶️',
      'movie_pause': '⏸️',
      'movie_complete': '✅',
      'subscription_purchase': '💳',
      'user_login': '🔐',
      'user_signup': '👤',
      'search': '🔍',
      'add_to_list': '➕',
      'remove_from_list': '➖'
    }
    return icons[eventType] || '📊'
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>📈 Advanced Analytics</h2>
        <button onClick={loadAnalytics} className="btn-refresh">
          🔄 Refresh
        </button>
      </div>

      <div className="analytics-overview">
        <div className="stat-card-analytics">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.totalEvents.toLocaleString()}</h3>
            <p>Total Events</p>
          </div>
        </div>

        <div className="stat-card-analytics">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.uniqueUsers}</h3>
            <p>Unique Users</p>
          </div>
        </div>

        <div className="stat-card-analytics">
          <div className="stat-icon">🎬</div>
          <div className="stat-info">
            <h3>{stats.popularMovies.length}</h3>
            <p>Popular Movies</p>
          </div>
        </div>

        <div className="stat-card-analytics">
          <div className="stat-icon">📱</div>
          <div className="stat-info">
            <h3>{((stats.deviceTypes.mobile / stats.totalEvents) * 100).toFixed(0)}%</h3>
            <p>Mobile Users</p>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>📈 User Activity (Last 7 Days)</h3>
          <div className="activity-chart">
            {stats.userActivity.map(([date, count]) => (
              <div key={date} className="activity-bar-container">
                <div 
                  className="activity-bar" 
                  style={{ height: `${(count / Math.max(...stats.userActivity.map(a => a[1]))) * 100}%` }}
                >
                  <span className="bar-label">{count}</span>
                </div>
                <span className="bar-date">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>🎬 Most Viewed Content</h3>
          <div className="popular-list">
            {stats.popularMovies.slice(0, 5).map((movie, index) => (
              <div key={movie.id} className="popular-item">
                <span className="rank">#{index + 1}</span>
                <span className="movie-name">Movie ID: {movie.id}</span>
                <span className="view-count">{movie.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>📱 Device Distribution</h3>
          <div className="device-chart">
            <div className="device-item">
              <span className="device-label">📱 Mobile</span>
              <div className="device-bar">
                <div 
                  className="device-fill mobile" 
                  style={{ width: `${(stats.deviceTypes.mobile / stats.totalEvents) * 100}%` }}
                ></div>
              </div>
              <span className="device-percent">{((stats.deviceTypes.mobile / stats.totalEvents) * 100).toFixed(1)}%</span>
            </div>
            <div className="device-item">
              <span className="device-label">💻 Desktop</span>
              <div className="device-bar">
                <div 
                  className="device-fill desktop" 
                  style={{ width: `${(stats.deviceTypes.desktop / stats.totalEvents) * 100}%` }}
                ></div>
              </div>
              <span className="device-percent">{((stats.deviceTypes.desktop / stats.totalEvents) * 100).toFixed(1)}%</span>
            </div>
            <div className="device-item">
              <span className="device-label">📲 Tablet</span>
              <div className="device-bar">
                <div 
                  className="device-fill tablet" 
                  style={{ width: `${(stats.deviceTypes.tablet / stats.totalEvents) * 100}%` }}
                ></div>
              </div>
              <span className="device-percent">{((stats.deviceTypes.tablet / stats.totalEvents) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>🕐 Recent Events</h3>
          <div className="recent-events">
            {analytics.slice(-10).reverse().map((event, index) => (
              <div key={index} className="event-item">
                <span className="event-icon">{getEventIcon(event.event)}</span>
                <div className="event-details">
                  <span className="event-name">{event.event.replace(/_/g, ' ')}</span>
                  <span className="event-time">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-insights">
        <h3>💡 Insights & Recommendations</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">🚀</span>
            <div>
              <h4>Peak Usage Time</h4>
              <p>Most users are active between 8 PM - 11 PM</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">📊</span>
            <div>
              <h4>Engagement Rate</h4>
              <p>Average session duration: 45 minutes</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">💰</span>
            <div>
              <h4>Conversion Rate</h4>
              <p>68% of trial users convert to paid</p>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">⭐</span>
            <div>
              <h4>User Satisfaction</h4>
              <p>4.5/5 average rating from users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
