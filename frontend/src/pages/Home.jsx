import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import VideoPlayer from '../components/VideoPlayer'
import ContinueWatching from '../components/ContinueWatching'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { movies as defaultMovies } from '../data/movies'
import { API_ENDPOINTS } from '../config/api'
import '../App.css'

function Home() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    
    loadMovies()
  }, [currentUser, navigate])

  const loadMovies = async () => {
    setLoading(true)
    try {
      // Try to fetch from API first
      const response = await fetch(API_ENDPOINTS.MOVIES)
      if (response.ok) {
        const apiMovies = await response.json()
        console.log('✅ Loaded movies from API:', apiMovies.length)
        
        // Merge API movies with default movies (avoid duplicates)
        const allMovies = [...defaultMovies]
        apiMovies.forEach(apiMovie => {
          // Only add if not already in default movies
          if (!allMovies.find(m => m.id === apiMovie.id || m._id === apiMovie._id)) {
            allMovies.push({
              ...apiMovie,
              id: apiMovie._id || apiMovie.id
            })
          }
        })
        
        setMovies(allMovies)
        localStorage.setItem('movies', JSON.stringify(allMovies))
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      console.log('⚠️ Using default movies (API not available)')
      // Fallback to default movies
      setMovies(defaultMovies)
      localStorage.setItem('movies', JSON.stringify(defaultMovies))
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = searchQuery
    ? movies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory === 'all'
    ? movies
    : selectedCategory === 'mylist'
    ? movies.filter(m => currentUser?.myList?.includes(m.id))
    : movies.filter(m => m.category === selectedCategory)

  const trending = filteredMovies.filter(m => m.category === 'trending')
  const action = filteredMovies.filter(m => m.category === 'action')
  const drama = filteredMovies.filter(m => m.category === 'drama')
  const comedy = filteredMovies.filter(m => m.category === 'comedy')
  const myListMovies = movies.filter(m => currentUser?.myList?.includes(m.id))

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  if (!currentUser) return null
  
  if (loading) {
    return <LoadingSpinner fullScreen={true} />
  }

  return (
    <div className="app">
      <Navbar 
        onSearch={setSearchQuery} 
        onCategoryChange={handleCategoryChange}
      />
      
      {!searchQuery && selectedCategory === 'all' && movies.length > 0 && (
        <Hero movie={movies[0]} onPlay={setSelectedMovie} />
      )}
      
      <div className="content">
        {searchQuery ? (
          <MovieRow 
            title="Search Results" 
            movies={filteredMovies} 
            onMovieClick={setSelectedMovie}
          />
        ) : selectedCategory === 'mylist' ? (
          <MovieRow 
            title="My List" 
            movies={myListMovies} 
            onMovieClick={setSelectedMovie}
          />
        ) : selectedCategory !== 'all' ? (
          <MovieRow 
            title={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} 
            movies={filteredMovies} 
            onMovieClick={setSelectedMovie}
          />
        ) : (
          <>
            <ContinueWatching onMovieClick={setSelectedMovie} />
            {myListMovies.length > 0 && (
              <MovieRow title="My List" movies={myListMovies} onMovieClick={setSelectedMovie} />
            )}
            <MovieRow title="Trending Now" movies={trending} onMovieClick={setSelectedMovie} />
            <MovieRow title="Action" movies={action} onMovieClick={setSelectedMovie} />
            <MovieRow title="Drama" movies={drama} onMovieClick={setSelectedMovie} />
            <MovieRow title="Comedy" movies={comedy} onMovieClick={setSelectedMovie} />
          </>
        )}
      </div>

      {selectedMovie && (
        <VideoPlayer movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}

export default Home
