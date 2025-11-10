import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Analytics from '../components/Analytics'
import PricingManager from '../components/PricingManager'
import MovieLanguageManager from '../components/MovieLanguageManager'
import { movies as defaultMovies } from '../data/movies'
import './Admin.css'

function Admin() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [selectedMovies, setSelectedMovies] = useState([])
  const [selectMode, setSelectMode] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [uploadMode, setUploadMode] = useState('url') // 'url' or 'file'
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    duration: '',
    rating: '',
    category: 'action',
    description: '',
    poster: '',
    backdrop: '',
    videoUrl: ''
  })

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login')
      return
    }
    loadMovies()
    loadUsers()
    loadCategories()
  }, [currentUser, navigate])

  const loadMovies = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      
      // Fetch hidden movie IDs from database
      let hiddenIds = []
      try {
        const hiddenResponse = await fetch(`${apiUrl}/api/hidden-movies`)
        if (hiddenResponse.ok) {
          const hiddenData = await hiddenResponse.json()
          hiddenIds = hiddenData.hiddenIds || []
          console.log('✅ Admin loaded hidden movies:', hiddenIds.length, hiddenIds)
        } else {
          console.log('⚠️ Hidden movies API returned:', hiddenResponse.status)
        }
      } catch (err) {
        console.log('⚠️ Could not load hidden movies:', err.message)
      }
      
      const response = await fetch(`${apiUrl}/api/movies`)
      
      if (response.ok) {
        const apiMovies = await response.json()
        console.log('✅ Admin loaded movies from API:', apiMovies.length)
        
        // Merge API movies with default movies
        const allMovies = [...defaultMovies]
        apiMovies.forEach(apiMovie => {
          if (!allMovies.find(m => m.id === apiMovie.id || m._id === apiMovie._id)) {
            allMovies.push({
              ...apiMovie,
              id: apiMovie._id || apiMovie.id
            })
          }
        })
        
        // Filter out hidden movies
        const filteredMovies = allMovies.filter(m => {
          const movieId = String(m._id || m.id)
          const isHidden = hiddenIds.includes(movieId)
          if (isHidden) {
            console.log('🚫 Filtering out hidden movie:', movieId, m.title)
          }
          return !isHidden
        })
        
        console.log('📊 Total movies:', allMovies.length, '| Hidden:', hiddenIds.length, '| Showing:', filteredMovies.length)
        
        setMovies(filteredMovies)
        localStorage.setItem('movies', JSON.stringify(filteredMovies))
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      console.log('⚠️ Admin using default movies (API not available)')
      setMovies(defaultMovies)
      localStorage.setItem('movies', JSON.stringify(defaultMovies))
    }
  }

  const loadUsers = () => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }

  const loadCategories = () => {
    const savedCategories = localStorage.getItem('categories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      const defaultCategories = ['trending', 'action', 'drama', 'comedy', 'horror', 'romance', 'sci-fi', 'documentary']
      setCategories(defaultCategories)
      localStorage.setItem('categories', JSON.stringify(defaultCategories))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // If file upload mode and has video file
    if (uploadMode === 'file' && videoFile && !editingMovie) {
      setUploading(true)
      setUploadMessage('')
      setUploadProgress(0)

      const uploadFormData = new FormData()
      uploadFormData.append('video', videoFile)
      uploadFormData.append('title', formData.title)
      uploadFormData.append('description', formData.description)
      uploadFormData.append('category', formData.category)
      uploadFormData.append('year', formData.year)
      uploadFormData.append('thumbnail', formData.poster)

      try {
        const token = localStorage.getItem('token')
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100)
            setUploadProgress(percent)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            setUploadMessage('✅ Video uploaded successfully!')
            loadMovies()
            resetForm()
          } else {
            const error = JSON.parse(xhr.responseText)
            setUploadMessage('❌ Upload failed: ' + error.error)
          }
          setUploading(false)
        })

        xhr.addEventListener('error', () => {
          setUploadMessage('❌ Upload failed: Network error')
          setUploading(false)
        })

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        xhr.open('POST', `${apiUrl}/api/upload/video`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send(uploadFormData)

      } catch (error) {
        setUploadMessage('❌ Error: ' + error.message)
        setUploading(false)
      }
      return
    }

    // Regular URL mode
    if (editingMovie) {
      const updatedMovies = movies.map(m => 
        m.id === editingMovie.id ? { ...formData, id: editingMovie.id } : m
      )
      setMovies(updatedMovies)
      localStorage.setItem('movies', JSON.stringify(updatedMovies))
    } else {
      const newMovie = { ...formData, id: Date.now() }
      const updatedMovies = [...movies, newMovie]
      setMovies(updatedMovies)
      localStorage.setItem('movies', JSON.stringify(updatedMovies))
    }

    resetForm()
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setFormData(movie)
    setShowAddForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this movie? This will hide it for all users.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      
      // Hide movie in database (works for both static and database movies)
      const response = await fetch(`${apiUrl}/api/hidden-movies/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        console.log('✅ Movie hidden in database for all users')
        alert('✅ Movie deleted successfully! It will be hidden for all users.')
      } else {
        console.log('⚠️ API hide failed')
        alert('⚠️ Failed to delete movie. Please try again.')
        return
      }
    } catch (error) {
      console.log('⚠️ API not available:', error)
      alert('⚠️ Cannot connect to server. Please check your connection.')
      return
    }

    // Update local state
    const updatedMovies = movies.filter(m => m.id !== id && m._id !== id)
    setMovies(updatedMovies)
    localStorage.setItem('movies', JSON.stringify(updatedMovies))
  }

  const toggleSelectMovie = (id) => {
    if (selectedMovies.includes(id)) {
      setSelectedMovies(selectedMovies.filter(movieId => movieId !== id))
    } else {
      setSelectedMovies([...selectedMovies, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedMovies.length === movies.length) {
      setSelectedMovies([])
    } else {
      setSelectedMovies(movies.map(m => m.id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedMovies.length === 0) {
      alert('Please select movies to delete')
      return
    }
    
    if (confirm(`Are you sure you want to delete ${selectedMovies.length} movie(s)?`)) {
      const updatedMovies = movies.filter(m => !selectedMovies.includes(m.id))
      setMovies(updatedMovies)
      localStorage.setItem('movies', JSON.stringify(updatedMovies))
      setSelectedMovies([])
      setSelectMode(false)
    }
  }

  const cancelSelectMode = () => {
    setSelectMode(false)
    setSelectedMovies([])
  }

  const resetForm = () => {
    setFormData({
      title: '',
      year: '',
      duration: '',
      rating: '',
      category: 'action',
      description: '',
      poster: '',
      backdrop: '',
      videoUrl: ''
    })
    setEditingMovie(null)
    setShowAddForm(false)
    setVideoFile(null)
    setUploadMode('url')
    setUploadMessage('')
    setUploadProgress(0)
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🎬 Admin Dashboard</h1>
        <div className="admin-actions">
          <button onClick={() => navigate('/')} className="btn-secondary">
            Back to Home
          </button>
          <button onClick={logout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{movies.length}</h3>
            <p>Total Movies</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.role === 'user').length}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.subscription?.status === 'active').length}</h3>
            <p>Active Subscriptions</p>
          </div>
          <div className="stat-card">
            <h3>{categories.length}</h3>
            <p>Categories</p>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
            onClick={() => setActiveTab('movies')}
          >
            🎬 Movies
          </button>
          <button 
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button 
            className={`tab ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            💳 Subscriptions
          </button>
          <button 
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button 
            className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📁 Categories
          </button>
          <button 
            className={`tab ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            💰 Pricing & Discounts
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-section">
            <h2>Platform Overview</h2>
            
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-icon">🎬</div>
                <div className="card-content">
                  <h3>{movies.length}</h3>
                  <p>Total Movies</p>
                  <span className="card-trend">+{movies.filter(m => {
                    const date = new Date(m.createdAt || Date.now())
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    return date > weekAgo
                  }).length} this week</span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">👥</div>
                <div className="card-content">
                  <h3>{users.filter(u => u.role === 'user').length}</h3>
                  <p>Total Users</p>
                  <span className="card-trend">+{users.filter(u => {
                    const date = new Date(u.createdAt)
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    return date > weekAgo
                  }).length} this week</span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">💰</div>
                <div className="card-content">
                  <h3>{users.filter(u => u.subscription?.status === 'active').length}</h3>
                  <p>Active Subscriptions</p>
                  <span className="card-trend">${(users.filter(u => u.subscription?.status === 'active').length * 12.99).toFixed(2)}/mo</span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">🎁</div>
                <div className="card-content">
                  <h3>{users.reduce((sum, u) => sum + (u.referral?.referredUsers?.length || 0), 0)}</h3>
                  <p>Total Referrals</p>
                  <span className="card-trend">{users.filter(u => (u.referral?.referredUsers?.length || 0) > 0).length} active referrers</span>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button onClick={() => setActiveTab('movies')} className="action-btn">
                  <span>🎬</span>
                  <div>
                    <strong>Add Movie</strong>
                    <p>Upload new content</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('users')} className="action-btn">
                  <span>👥</span>
                  <div>
                    <strong>View Users</strong>
                    <p>Manage accounts</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('analytics')} className="action-btn">
                  <span>📈</span>
                  <div>
                    <strong>Analytics</strong>
                    <p>View insights</p>
                  </div>
                </button>
                <button onClick={() => setActiveTab('categories')} className="action-btn">
                  <span>📁</span>
                  <div>
                    <strong>Categories</strong>
                    <p>Organize content</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div className="activity-content">
                      <p><strong>{user.name}</strong> joined the platform</p>
                      <span className="activity-time">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <>
            <div className="admin-toolbar">
              <h2>Manage Movies</h2>
              <div className="toolbar-actions">
                {!selectMode ? (
                  <>
                    <button 
                      onClick={() => setSelectMode(true)} 
                      className="btn-secondary"
                    >
                      🗑️ Multi Delete
                    </button>
                    <button 
                      onClick={() => setShowAddForm(!showAddForm)} 
                      className="btn-primary"
                    >
                      {showAddForm ? 'Cancel' : '+ Add New Movie'}
                    </button>
                  </>
                ) : (
                  <>
                    <span className="selected-count">
                      {selectedMovies.length} selected
                    </span>
                    <button 
                      onClick={handleBulkDelete} 
                      className="btn-danger"
                      disabled={selectedMovies.length === 0}
                    >
                      Delete Selected ({selectedMovies.length})
                    </button>
                    <button 
                      onClick={cancelSelectMode} 
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

        {showAddForm && (
          <form className="movie-form" onSubmit={handleSubmit}>
            <h3>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
            
            {!editingMovie && (
              <div className="upload-mode-toggle">
                <button
                  type="button"
                  className={`mode-btn ${uploadMode === 'url' ? 'active' : ''}`}
                  onClick={() => setUploadMode('url')}
                >
                  🔗 Add with URL
                </button>
                <button
                  type="button"
                  className={`mode-btn ${uploadMode === 'file' ? 'active' : ''}`}
                  onClick={() => setUploadMode('file')}
                >
                  📤 Upload Video File
                </button>
              </div>
            )}

            <div className="form-grid">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                disabled={uploading}
              />
              <input
                type="number"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                required
                disabled={uploading}
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2h 30m)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                required={uploadMode === 'url'}
                disabled={uploading}
              />
              <input
                type="text"
                placeholder="Rating (e.g., PG-13)"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                required={uploadMode === 'url'}
                disabled={uploading}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                disabled={uploading}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              disabled={uploading}
            />
            <input
              type="url"
              placeholder="Poster URL"
              value={formData.poster}
              onChange={(e) => setFormData({...formData, poster: e.target.value})}
              required
              disabled={uploading}
            />
            <input
              type="url"
              placeholder="Backdrop URL"
              value={formData.backdrop}
              onChange={(e) => setFormData({...formData, backdrop: e.target.value})}
              required={uploadMode === 'url'}
              disabled={uploading}
            />

            {uploadMode === 'url' ? (
              <input
                type="url"
                placeholder="Video URL"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                required
                disabled={uploading}
              />
            ) : (
              <div className="file-upload-area">
                <label htmlFor="videoFile" className="file-upload-label">
                  {videoFile ? (
                    <>
                      <span className="file-icon">📹</span>
                      <span className="file-name">{videoFile.name}</span>
                      <span className="file-size">({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </>
                  ) : (
                    <>
                      <span className="file-icon">📁</span>
                      <span>Click to select video file</span>
                      <small>Supported: MP4, MKV, AVI, MOV, WebM (Max 5GB)</small>
                    </>
                  )}
                </label>
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  disabled={uploading}
                  style={{ display: 'none' }}
                  required={uploadMode === 'file'}
                />
              </div>
            )}

            {uploading && (
              <div className="upload-progress">
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress}%
                  </div>
                </div>
                <p className="progress-text">Uploading... Please wait</p>
              </div>
            )}

            {uploadMessage && (
              <div className={`upload-message ${uploadMessage.includes('✅') ? 'success' : 'error'}`}>
                {uploadMessage}
              </div>
            )}

            {editingMovie && (
              <MovieLanguageManager 
                movie={editingMovie}
                onUpdate={(updatedMovie) => {
                  setEditingMovie(updatedMovie)
                  setFormData(updatedMovie)
                }}
              />
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={uploading}>
                {uploading ? 'Uploading...' : editingMovie ? 'Update Movie' : uploadMode === 'file' ? '📤 Upload Video' : 'Add Movie'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary" disabled={uploading}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="movies-table">
          <table>
            <thead>
              <tr>
                {selectMode && (
                  <th>
                    <input 
                      type="checkbox" 
                      checked={selectedMovies.length === movies.length && movies.length > 0}
                      onChange={toggleSelectAll}
                      className="checkbox-select"
                    />
                  </th>
                )}
                <th>Poster</th>
                <th>Title</th>
                <th>Year</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Rating</th>
                {!selectMode && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr 
                  key={movie.id}
                  className={selectedMovies.includes(movie.id) ? 'selected-row' : ''}
                >
                  {selectMode && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedMovies.includes(movie.id)}
                        onChange={() => toggleSelectMovie(movie.id)}
                        className="checkbox-select"
                      />
                    </td>
                  )}
                  <td>
                    <img src={movie.poster} alt={movie.title} className="table-poster" />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td><span className="category-badge">{movie.category}</span></td>
                  <td>{movie.duration}</td>
                  <td>{movie.rating}</td>
                  {!selectMode && (
                    <td>
                      <button onClick={() => handleEdit(movie)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(movie.id)} className="btn-delete">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="user-filters">
                <select className="filter-select">
                  <option>All Users</option>
                  <option>Active Subscribers</option>
                  <option>Trial Users</option>
                  <option>Expired</option>
                </select>
                <input type="text" placeholder="Search users..." className="search-input" />
              </div>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Subscription</th>
                    <th>Status</th>
                    <th>Referrals</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className="role-badge">{user.role}</span></td>
                      <td>{user.subscription?.plan?.toUpperCase() || 'FREE'}</td>
                      <td>
                        <span className={`status-badge ${user.subscription?.status}`}>
                          {user.subscription?.status?.toUpperCase() || 'TRIAL'}
                        </span>
                      </td>
                      <td>{user.referral?.referredUsers?.length || 0}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn-action" title="View Details">👁️</button>
                        <button className="btn-action" title="Send Email">✉️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="subscriptions-section">
            <h2>Subscription Management</h2>
            
            <div className="subscription-stats">
              <div className="stat-box">
                <h4>Monthly Revenue</h4>
                <p className="revenue">${(users.filter(u => u.subscription?.status === 'active').reduce((sum, u) => {
                  const prices = { basic: 8.99, standard: 13.99, premium: 17.99 }
                  return sum + (prices[u.subscription?.plan] || 0)
                }, 0)).toFixed(2)}</p>
              </div>
              <div className="stat-box">
                <h4>Active Subscriptions</h4>
                <p className="count">{users.filter(u => u.subscription?.status === 'active').length}</p>
              </div>
              <div className="stat-box">
                <h4>Trial Users</h4>
                <p className="count">{users.filter(u => u.subscription?.status === 'trial').length}</p>
              </div>
              <div className="stat-box">
                <h4>Churn Rate</h4>
                <p className="percentage">2.3%</p>
              </div>
            </div>

            <div className="subscription-breakdown">
              <h3>Plan Distribution</h3>
              <div className="plan-stats">
                <div className="plan-stat">
                  <span className="plan-name">Basic</span>
                  <div className="plan-bar">
                    <div className="plan-fill" style={{ width: `${(users.filter(u => u.subscription?.plan === 'basic').length / users.length * 100)}%` }}></div>
                  </div>
                  <span className="plan-count">{users.filter(u => u.subscription?.plan === 'basic').length}</span>
                </div>
                <div className="plan-stat">
                  <span className="plan-name">Standard</span>
                  <div className="plan-bar">
                    <div className="plan-fill" style={{ width: `${(users.filter(u => u.subscription?.plan === 'standard').length / users.length * 100)}%` }}></div>
                  </div>
                  <span className="plan-count">{users.filter(u => u.subscription?.plan === 'standard').length}</span>
                </div>
                <div className="plan-stat">
                  <span className="plan-name">Premium</span>
                  <div className="plan-bar">
                    <div className="plan-fill" style={{ width: `${(users.filter(u => u.subscription?.plan === 'premium').length / users.length * 100)}%` }}></div>
                  </div>
                  <span className="plan-count">{users.filter(u => u.subscription?.plan === 'premium').length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <>
            <Analytics />
            <div className="analytics-section" style={{ marginTop: '30px' }}>
            <h2>Platform Analytics</h2>
            
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>User Growth</h3>
                <div className="chart-placeholder">
                  <div className="growth-chart">
                    {[20, 35, 45, 60, 55, 70, users.length].map((val, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${val}%` }}>
                        <span className="bar-value">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Popular Categories</h3>
                <div className="category-stats">
                  {categories.map(cat => (
                    <div key={cat} className="category-stat-item">
                      <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                      <div className="stat-bar">
                        <div className="stat-fill" style={{ width: `${(movies.filter(m => m.category === cat).length / movies.length * 100)}%` }}></div>
                      </div>
                      <span>{movies.filter(m => m.category === cat).length}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h3>Referral Performance</h3>
                <div className="referral-stats">
                  <p>Total Referrals: <strong>{users.reduce((sum, u) => sum + (u.referral?.referredUsers?.length || 0), 0)}</strong></p>
                  <p>Active Referrers: <strong>{users.filter(u => (u.referral?.referredUsers?.length || 0) > 0).length}</strong></p>
                  <p>Conversion Rate: <strong>68%</strong></p>
                  <p>Avg Referrals/User: <strong>{(users.reduce((sum, u) => sum + (u.referral?.referredUsers?.length || 0), 0) / users.length).toFixed(1)}</strong></p>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Revenue Insights</h3>
                <div className="revenue-stats">
                  <p>This Month: <strong>${(users.filter(u => u.subscription?.status === 'active').length * 12.99).toFixed(2)}</strong></p>
                  <p>Last Month: <strong>$1,234.56</strong></p>
                  <p>Growth: <strong className="positive">+23%</strong></p>
                  <p>Projected: <strong>${(users.filter(u => u.subscription?.status === 'active').length * 12.99 * 1.23).toFixed(2)}</strong></p>
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        {activeTab === 'categories' && (
          <div className="categories-section">
            <div className="admin-toolbar">
              <h2>Manage Categories</h2>
              <button 
                onClick={() => setShowCategoryForm(!showCategoryForm)} 
                className="btn-primary"
              >
                {showCategoryForm ? 'Cancel' : '+ Add Category'}
              </button>
            </div>

            {showCategoryForm && (
              <div className="category-form">
                <input
                  type="text"
                  placeholder="Category Name (e.g., horror, sci-fi)"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value.toLowerCase())}
                />
                <button 
                  onClick={() => {
                    if (newCategory && !categories.includes(newCategory)) {
                      const updated = [...categories, newCategory]
                      setCategories(updated)
                      localStorage.setItem('categories', JSON.stringify(updated))
                      setNewCategory('')
                      setShowCategoryForm(false)
                    }
                  }}
                  className="btn-primary"
                >
                  Add Category
                </button>
              </div>
            )}

            <div className="categories-grid">
              {categories.map(category => (
                <div key={category} className="category-item">
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <span className="movie-count">
                    {movies.filter(m => m.category === category).length} movies
                  </span>
                  <button 
                    onClick={() => {
                      if (confirm(`Delete category "${category}"?`)) {
                        const updated = categories.filter(c => c !== category)
                        setCategories(updated)
                        localStorage.setItem('categories', JSON.stringify(updated))
                      }
                    }}
                    className="btn-delete-small"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <PricingManager />
        )}

        {activeTab === 'upload' && (
          <div className="upload-section">
            <h2>📤 Upload Video to Server</h2>
            <p className="upload-subtitle">Upload actual video files to your backend server</p>

            <form className="video-upload-form" onSubmit={async (e) => {
              e.preventDefault()
              
              if (!videoFile) {
                setUploadMessage('Please select a video file')
                return
              }

              setUploading(true)
              setUploadMessage('')
              setUploadProgress(0)

              const uploadFormData = new FormData()
              uploadFormData.append('video', videoFile)
              uploadFormData.append('title', formData.title)
              uploadFormData.append('description', formData.description)
              uploadFormData.append('category', formData.category)
              uploadFormData.append('year', formData.year)
              uploadFormData.append('thumbnail', formData.poster)

              try {
                const token = localStorage.getItem('token')
                const xhr = new XMLHttpRequest()

                xhr.upload.addEventListener('progress', (e) => {
                  if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100)
                    setUploadProgress(percent)
                  }
                })

                xhr.addEventListener('load', () => {
                  if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText)
                    setUploadMessage('✅ Video uploaded successfully!')
                    setVideoFile(null)
                    setFormData({
                      title: '',
                      year: '',
                      duration: '',
                      rating: '',
                      category: 'action',
                      description: '',
                      poster: '',
                      backdrop: '',
                      videoUrl: ''
                    })
                    loadMovies()
                  } else {
                    const error = JSON.parse(xhr.responseText)
                    setUploadMessage('❌ Upload failed: ' + error.error)
                  }
                  setUploading(false)
                })

                xhr.addEventListener('error', () => {
                  setUploadMessage('❌ Upload failed: Network error')
                  setUploading(false)
                })

                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
                xhr.open('POST', `${apiUrl}/api/upload/video`)
                xhr.setRequestHeader('Authorization', `Bearer ${token}`)
                xhr.send(uploadFormData)

              } catch (error) {
                setUploadMessage('❌ Error: ' + error.message)
                setUploading(false)
              }
            }}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Movie Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  disabled={uploading}
                />
                <input
                  type="number"
                  placeholder="Year *"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  required
                  disabled={uploading}
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  disabled={uploading}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Description *"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                disabled={uploading}
              />

              <input
                type="url"
                placeholder="Thumbnail URL *"
                value={formData.poster}
                onChange={(e) => setFormData({...formData, poster: e.target.value})}
                required
                disabled={uploading}
              />

              <div className="file-upload-area">
                <label htmlFor="videoFile" className="file-upload-label">
                  {videoFile ? (
                    <>
                      <span className="file-icon">📹</span>
                      <span className="file-name">{videoFile.name}</span>
                      <span className="file-size">({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </>
                  ) : (
                    <>
                      <span className="file-icon">📁</span>
                      <span>Click to select video file</span>
                      <small>Supported: MP4, MKV, AVI, MOV, WebM (Max 5GB)</small>
                    </>
                  )}
                </label>
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </div>

              {uploading && (
                <div className="upload-progress">
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}>
                      {uploadProgress}%
                    </div>
                  </div>
                  <p className="progress-text">Uploading... Please wait</p>
                </div>
              )}

              {uploadMessage && (
                <div className={`upload-message ${uploadMessage.includes('✅') ? 'success' : 'error'}`}>
                  {uploadMessage}
                </div>
              )}

              <button type="submit" className="btn-primary btn-upload" disabled={uploading || !videoFile}>
                {uploading ? 'Uploading...' : '📤 Upload Video'}
              </button>
            </form>

            <div className="upload-info">
              <h3>ℹ️ Upload Information</h3>
              <ul>
                <li>Videos are uploaded to your backend server at <code>http://localhost:5000</code></li>
                <li>Files are stored in <code>backend/uploads/videos/</code></li>
                <li>Maximum file size: 5GB</li>
                <li>Supported formats: MP4, MKV, AVI, MOV, WebM</li>
                <li>Make sure your backend server is running</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
