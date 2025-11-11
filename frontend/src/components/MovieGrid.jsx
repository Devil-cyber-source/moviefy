import { useState } from 'react'
import './MovieGrid.css'

function MovieGrid({ movies, title, onMovieClick, onAddToList }) {
  const [hoveredMovie, setHoveredMovie] = useState(null)

  if (!movies || movies.length === 0) return null

  return (
    <div className="movie-grid-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div 
            key={movie.id || movie._id}
            className="movie-card"
            onMouseEnter={() => setHoveredMovie(movie.id || movie._id)}
            onMouseLeave={() => setHoveredMovie(null)}
            onClick={() => onMovieClick(movie)}
          >
            <div className="movie-poster">
              <img 
                src={movie.poster || movie.thumbnail} 
                alt={movie.title}
                loading="lazy"
              />
              {hoveredMovie === (movie.id || movie._id) && (
                <div className="movie-overlay">
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <div className="movie-meta">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                  <div className="movie-actions">
                    <button 
                      className="action-btn play-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        onMovieClick(movie)
                      }}
                    >
                      ▶
                    </button>
                    <button 
                      className="action-btn add-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        onAddToList && onAddToList(movie)
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="movie-title">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
