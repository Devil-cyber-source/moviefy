import { useState } from 'react'
import './Hero.css'

function Hero({ movie, onPlay }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="hero" style={{
      backgroundImage: `linear-gradient(to bottom, transparent, #141414), url(${movie.backdrop})`
    }}>
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-description">{movie.description}</p>
        <div className="hero-buttons">
          <button className="btn btn-play" onClick={() => onPlay(movie)}>
            ▶ Play
          </button>
          <button className="btn btn-info" onClick={() => setShowInfo(!showInfo)}>
            ℹ More Info
          </button>
        </div>
        {showInfo && (
          <div className="hero-info-panel">
            <h3>Details</h3>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Category:</strong> {movie.category}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero
