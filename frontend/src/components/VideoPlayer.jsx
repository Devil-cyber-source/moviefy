import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import MovieRating from './MovieRating'
import './VideoPlayer.css'

function VideoPlayer({ movie, onClose }) {
  const { currentUser } = useAuth()
  const videoRef = useRef(null)
  const [showRating, setShowRating] = useState(false)

  // Check if video is YouTube, Vimeo, or uploaded file
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const isYouTube = movie.videoUrl?.includes('youtube.com') || movie.videoUrl?.includes('youtu.be') || movie.videoUrl?.startsWith('youtube:')
  const isVimeo = movie.videoUrl?.includes('vimeo.com') || movie.videoUrl?.startsWith('vimeo:')
  const isUploaded = movie.videoUrl?.startsWith('/uploads/') || movie.videoUrl?.startsWith(`${API_URL}/uploads/`)

  // Extract video ID
  const getVideoId = () => {
    if (movie.videoUrl?.startsWith('youtube:')) {
      return movie.videoUrl.replace('youtube:', '')
    }
    if (movie.videoUrl?.startsWith('vimeo:')) {
      return movie.videoUrl.replace('vimeo:', '')
    }
    if (movie.videoUrl?.includes('youtube.com/watch?v=')) {
      return movie.videoUrl.split('v=')[1]?.split('&')[0]
    }
    if (movie.videoUrl?.includes('youtu.be/')) {
      return movie.videoUrl.split('youtu.be/')[1]?.split('?')[0]
    }
    if (movie.videoUrl?.includes('vimeo.com/')) {
      return movie.videoUrl.split('vimeo.com/')[1]?.split('?')[0]
    }
    return null
  }

  const videoId = getVideoId()

  useEffect(() => {
    if (isYouTube || isVimeo) return // Skip for embedded videos

    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100
      
      // Save watch history
      const history = JSON.parse(localStorage.getItem('watchHistory') || '[]')
      const existingIndex = history.findIndex(
        h => h.userId === currentUser.id && h.movieId === movie.id
      )

      const historyItem = {
        userId: currentUser.id,
        movieId: movie.id,
        movie: movie,
        progress: Math.round(progress),
        lastWatched: new Date().toISOString()
      }

      if (existingIndex >= 0) {
        history[existingIndex] = historyItem
      } else {
        history.push(historyItem)
      }

      localStorage.setItem('watchHistory', JSON.stringify(history))
    }

    video.addEventListener('timeupdate', updateProgress)
    return () => video.removeEventListener('timeupdate', updateProgress)
  }, [currentUser, movie, isYouTube, isVimeo])

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        {isYouTube && videoId ? (
          <iframe
            className="video-player"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={movie.title}
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : isVimeo && videoId ? (
          <iframe
            className="video-player"
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
            title={movie.title}
            style={{ border: 'none' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video 
            ref={videoRef}
            controls 
            autoPlay
            className="video-player"
            poster={movie.backdrop}
          >
            <source 
              src={isUploaded ? `${API_URL}${movie.videoUrl}` : movie.videoUrl} 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="video-info">
          <div className="video-header">
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <div className="video-meta">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span>{movie.rating}</span>
              </div>
            </div>
            <button onClick={() => setShowRating(!showRating)} className="btn-toggle-rating">
              {showRating ? 'Hide' : 'Show'} Ratings & Reviews
            </button>
          </div>
          
          {showRating && <MovieRating movie={movie} />}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
