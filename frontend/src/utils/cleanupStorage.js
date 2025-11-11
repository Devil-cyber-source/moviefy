// Utility to clean up localStorage when movies are deleted

export const cleanupWatchHistory = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const response = await fetch(`${apiUrl}/api/movies`)
    
    if (!response.ok) return
    
    const currentMovies = await response.json()
    const currentMovieIds = currentMovies.map(m => String(m._id || m.id))
    
    // Clean watch history
    const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
    const cleanedHistory = watchHistory.filter(item => {
      const movieId = String(item.movie?._id || item.movie?.id || item.movieId)
      return currentMovieIds.includes(movieId)
    })
    
    if (cleanedHistory.length !== watchHistory.length) {
      localStorage.setItem('watchHistory', JSON.stringify(cleanedHistory))
      console.log(`🧹 Cleaned ${watchHistory.length - cleanedHistory.length} invalid watch history items`)
    }
    
    // Clean movies cache
    const cachedMovies = JSON.parse(localStorage.getItem('movies') || '[]')
    const validMovies = cachedMovies.filter(movie => {
      const movieId = String(movie._id || movie.id)
      return currentMovieIds.includes(movieId)
    })
    
    if (validMovies.length !== cachedMovies.length) {
      localStorage.setItem('movies', JSON.stringify(validMovies))
      console.log(`🧹 Cleaned ${cachedMovies.length - validMovies.length} invalid cached movies`)
    }
    
  } catch (error) {
    console.log('Could not cleanup storage:', error)
  }
}

// Clear all watch history
export const clearAllWatchHistory = () => {
  localStorage.removeItem('watchHistory')
  console.log('🧹 Cleared all watch history')
}

// Clear watch history for specific user
export const clearUserWatchHistory = (userId) => {
  const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
  const filtered = watchHistory.filter(h => h.userId !== userId)
  localStorage.setItem('watchHistory', JSON.stringify(filtered))
  console.log(`🧹 Cleared watch history for user ${userId}`)
}
