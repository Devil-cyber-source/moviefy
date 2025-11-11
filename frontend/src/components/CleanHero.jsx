import { useState, useEffect } from 'react'
import './CleanHero.css'

function CleanHero({ movies, onMovieClick }) {
  const [currentMovie, setCurrentMovie] = useState(null)

  useEffect(() => {
    if (movies && movies.length > 0) {
      // Pick a random featured movie
      const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 10))
      setCurrentMovie(movies[randomIndex])
    }
  }, [movies])

  if (!currentMovie) return null

  return (
    <div className="clean-hero">
      <div className="hero-background">
        <img 
          src={currentMovie.backdrop || currentMovie.poster || currentMovie.thumbnail} 
          alt={currentMovie.title}
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{currentMovie.title}</h1>
          <div className="hero-meta">
            <span className="hero-year">{currentMovie.year}</span>
            <span className="hero-duration">{currentMovie.duration}</span>
            <span className="hero-rating">{currentMovie.rating}</span>
          </div>
          <p className="hero-description">
            {currentMovie.description?.slice(0, 200)}...
          </p>
          <div className="hero-actions">
            <button 
              className="btn-play"
              onClick={() => onMovieClick(currentMovie)}
            >
              ▶ Play Now
            </button>
            <button className="btn-info">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleanHero
