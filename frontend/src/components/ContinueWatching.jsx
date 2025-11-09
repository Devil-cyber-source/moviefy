import { useAuth } from '../context/AuthContext'
import './ContinueWatching.css'

function ContinueWatching({ onMovieClick }) {
  const { currentUser } = useAuth()
  
  const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
  const userHistory = watchHistory.filter(h => h.userId === currentUser?.id)
  
  if (userHistory.length === 0) return null

  return (
    <div className="continue-watching">
      <h2 className="section-title">Continue Watching</h2>
      <div className="continue-row">
        {userHistory.slice(0, 5).map(item => (
          <div 
            key={item.movieId} 
            className="continue-card"
            onClick={() => onMovieClick(item.movie)}
          >
            <div className="continue-poster">
              <img src={item.movie.poster} alt={item.movie.title} />
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="continue-info">
              <h4>{item.movie.title}</h4>
              <p>{item.progress}% watched</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinueWatching
