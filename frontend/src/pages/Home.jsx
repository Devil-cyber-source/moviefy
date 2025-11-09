import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import VideoPlayer from '../components/VideoPlayer'
import ContinueWatching from '../components/ContinueWatching'
import { useAuth } from '../context/AuthContext'
import { movies as defaultMovies } from '../data/movies'
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

  const loadMovies = () => {
    setLoading(true)
    // Force clear cache and load fresh movies
    localStorage.removeItem('movies')
    console.log('Loading movies:', defaultMovies.length, 'movies')
    setMovies(defaultMovies)
    localStorage.setItem('movies', JSON.stringify(defaultMovies))
    setTimeout(() => setLoading(false), 500)
    
    // Then merge with any admin-added movies
    const savedMovies = localStorage.getItem('movies')
    if (savedMovies) {
      const saved = JSON.parse(savedMovies)
      // Keep admin-added movies (id > 1000)
      const adminMovies = saved.filter(m => m.id > 1000)
      if (adminMovies.length > 0) {
        const combined = [...defaultMovies, ...adminMovies]
        setMovies(combined)
        localStorage.setItem('movies', JSON.stringify(combined))
      }
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
