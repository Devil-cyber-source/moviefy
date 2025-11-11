import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import OptimizedImage from './OptimizedImage'
import './ContinueWatching.css'

function ContinueWatching({ onMovieClick }) {
  const { currentUser } = useAuth()
  const [validHistory, setValidHistory] = useState([])
  
  useEffect(() => {
    const loadValidHistory = async () => {
      try {
        const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
        const userHistory = watchHistory.filter(h => h.userId === currentUser?.id)
        
        // Get current movies from API to validate
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiUrl}/api/movies`)
        
        if (response.ok) {
          const currentMovies = await response.json()
          const currentMovieIds = currentMovies.map(m => m._id || m.id)
          
          // Filter out movies that no longer exist
          const validItems = userHistory.filter(item => {
            const movieId = item.movie?._id || item.movie?.id || item.movieId
            return currentMovieIds.includes(movieId)
          })
          
          setValidHistory(validItems)
          
          // Clean up localStorage if items were removed
          if (validItems.length !== userHistory.length) {
            const cleanedHistory = watchHistory.filter(h => {
              if (h.userId !== currentUser?.id) return true
              const movieId = h.movie?._id || h.movie?.id || h.movieId
              return currentMovieIds.includes(movieId)
            })
            localStorage.setItem('watchHistory', JSON.stringify(cleanedHistory))
          }
        } else {
          setValidHistory(userHistory)
        }
      } catch (error) {
        console.log('Could not validate watch history:', error)
        const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
        setValidHistory(watchHistory.filter(h => h.userId === currentUser?.id))
      }
    }
    
    if (currentUser) {
      loadValidHistory()
    }
  }, [currentUser])
  
  if (validHistory.length === 0) return null

  return (
    <div className="continue-watching">
      <h2 className="section-title">Continue Watching</h2>
      <div className="continue-row">
        {validHistory.slice(0, 5).map(item => (
          <div 
            key={item.movieId} 
            className="continue-card"
            onClick={() => onMovieClick(item.movie)}
          >
            <div className="continue-poster">
              <OptimizedImage 
                src={item.movie.poster} 
                alt={item.movie.title}
                className="continue-poster-img"
              />
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
