import { useAuth } from '../context/AuthContext'
import OptimizedImage from './OptimizedImage'
import './MovieRow.css'

function MovieRow({ title, movies, onMovieClick }) {
  const { currentUser, addToMyList, removeFromMyList } = useAuth()

  const isInMyList = (movieId) => {
    return currentUser?.myList?.includes(movieId)
  }

  const handleListToggle = (e, movie) => {
    e.stopPropagation()
    if (isInMyList(movie.id)) {
      removeFromMyList(movie.id)
    } else {
      addToMyList(movie.id)
    }
  }

  if (movies.length === 0) {
    return (
      <div className="movie-row">
        <h2 className="row-title">{title}</h2>
        <p className="no-movies">No movies in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => onMovieClick(movie)}
          >
            <OptimizedImage 
              src={movie.poster} 
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <button 
                className={`add-to-list ${isInMyList(movie.id) ? 'in-list' : ''}`}
                onClick={(e) => handleListToggle(e, movie)}
              >
                {isInMyList(movie.id) ? '✓' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieRow
