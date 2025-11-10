import { useState } from 'react'
import './SwipeableMovies.css'

function SwipeableMovies({ movies, onMovieClick, onAddToList }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const currentMovie = movies[currentIndex]

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - next movie
      handleNext()
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right - previous movie
      handlePrevious()
    }
  }

  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (!currentMovie) return null

  return (
    <div className="swipeable-container">
      <div 
        className="swipeable-card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="swipe-movie-poster">
          <img src={currentMovie.poster} alt={currentMovie.title} />
          <div className="swipe-overlay">
            <h2>{currentMovie.title}</h2>
            <div className="swipe-meta">
              <span>{currentMovie.year}</span>
              <span>{currentMovie.duration}</span>
              <span>{currentMovie.rating}</span>
            </div>
          </div>
        </div>

        <div className="swipe-actions">
          <button 
            className="swipe-btn swipe-skip"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Skip
          </button>
          
          <button 
            className="swipe-btn swipe-add"
            onClick={() => onAddToList(currentMovie)}
          >
            + My List
          </button>
          
          <button 
            className="swipe-btn swipe-watch"
            onClick={() => onMovieClick(currentMovie)}
          >
            ▶ Watch
          </button>
          
          <button 
            className="swipe-btn swipe-next"
            onClick={handleNext}
            disabled={currentIndex === movies.length - 1}
          >
            Next →
          </button>
        </div>

        <div className="swipe-counter">
          {currentIndex + 1} / {movies.length}
        </div>
      </div>

      <div className="swipe-hint">
        👈 Swipe left or right to browse movies 👉
      </div>
    </div>
  )
}

export default SwipeableMovies
