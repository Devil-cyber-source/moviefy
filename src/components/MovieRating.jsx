import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './MovieRating.css'

function MovieRating({ movie }) {
  const { currentUser } = useAuth()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)

  const ratings = JSON.parse(localStorage.getItem('movieRatings') || '[]')
  const movieRatings = ratings.filter(r => r.movieId === movie.id)
  const avgRating = movieRatings.length > 0
    ? (movieRatings.reduce((sum, r) => sum + r.rating, 0) / movieRatings.length).toFixed(1)
    : 0

  const userRating = movieRatings.find(r => r.userId === currentUser?.id)

  const submitRating = () => {
    if (rating === 0) return

    const newRating = {
      movieId: movie.id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      review,
      date: new Date().toISOString()
    }

    const existingIndex = ratings.findIndex(
      r => r.movieId === movie.id && r.userId === currentUser.id
    )

    if (existingIndex >= 0) {
      ratings[existingIndex] = newRating
    } else {
      ratings.push(newRating)
    }

    localStorage.setItem('movieRatings', JSON.stringify(ratings))
    setShowReviewForm(false)
    alert('Rating submitted!')
  }

  return (
    <div className="movie-rating">
      <div className="rating-summary">
        <div className="avg-rating">
          <span className="rating-number">{avgRating}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} className={star <= Math.round(avgRating) ? 'filled' : ''}>
                ⭐
              </span>
            ))}
          </div>
          <span className="rating-count">({movieRatings.length} ratings)</span>
        </div>

        {!userRating && (
          <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-rate">
            Rate This Movie
          </button>
        )}
      </div>

      {showReviewForm && (
        <div className="rating-form">
          <h4>Your Rating</h4>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={star <= (hover || rating) ? 'filled' : ''}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ⭐
              </span>
            ))}
          </div>
          <textarea
            placeholder="Write a review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={submitRating} className="btn-submit">
            Submit Rating
          </button>
        </div>
      )}

      {userRating && (
        <div className="user-rating">
          <p>Your rating: {userRating.rating} ⭐</p>
          {userRating.review && <p className="user-review">"{userRating.review}"</p>}
        </div>
      )}

      <div className="reviews-list">
        <h4>Reviews</h4>
        {movieRatings.slice(0, 3).map((r, i) => (
          <div key={i} className="review-item">
            <div className="review-header">
              <strong>{r.userName}</strong>
              <span>{r.rating} ⭐</span>
            </div>
            {r.review && <p>{r.review}</p>}
            <span className="review-date">{new Date(r.date).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieRating
