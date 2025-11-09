import { useState } from 'react'
import './MovieLanguageManager.css'

function MovieLanguageManager({ movie, onUpdate }) {
  const [languages, setLanguages] = useState(movie.languages || [
    { code: 'en', name: 'English', audioUrl: movie.videoUrl, subtitleUrl: '' }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLanguage, setNewLanguage] = useState({
    code: '',
    name: '',
    audioUrl: '',
    subtitleUrl: ''
  })

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' }
  ]

  const handleAddLanguage = () => {
    if (!newLanguage.code || !newLanguage.name) {
      alert('Please select a language')
      return
    }

    if (languages.find(l => l.code === newLanguage.code)) {
      alert('This language already exists')
      return
    }

    const updatedLanguages = [...languages, newLanguage]
    setLanguages(updatedLanguages)
    
    if (onUpdate) {
      onUpdate({ ...movie, languages: updatedLanguages })
    }

    setNewLanguage({ code: '', name: '', audioUrl: '', subtitleUrl: '' })
    setShowAddForm(false)
  }

  const handleRemoveLanguage = (code) => {
    if (languages.length === 1) {
      alert('Cannot remove the last language')
      return
    }

    if (!confirm(`Remove ${languages.find(l => l.code === code)?.name}?`)) {
      return
    }

    const updatedLanguages = languages.filter(l => l.code !== code)
    setLanguages(updatedLanguages)
    
    if (onUpdate) {
      onUpdate({ ...movie, languages: updatedLanguages })
    }
  }

  const handleUpdateLanguage = (code, field, value) => {
    const updatedLanguages = languages.map(l => 
      l.code === code ? { ...l, [field]: value } : l
    )
    setLanguages(updatedLanguages)
    
    if (onUpdate) {
      onUpdate({ ...movie, languages: updatedLanguages })
    }
  }

  return (
    <div className="language-manager">
      <div className="language-header">
        <h3>🌍 Available Languages</h3>
        <button 
          className="btn-add"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Language'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-language-form">
          <div className="form-group">
            <label>Language</label>
            <select
              value={newLanguage.code}
              onChange={(e) => {
                const lang = availableLanguages.find(l => l.code === e.target.value)
                setNewLanguage({
                  ...newLanguage,
                  code: lang.code,
                  name: lang.name
                })
              }}
            >
              <option value="">Select Language</option>
              {availableLanguages
                .filter(al => !languages.find(l => l.code === al.code))
                .map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Audio URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/movie-spanish.mp4"
              value={newLanguage.audioUrl}
              onChange={(e) => setNewLanguage({...newLanguage, audioUrl: e.target.value})}
            />
            <small>Leave empty to use original audio with subtitles</small>
          </div>

          <div className="form-group">
            <label>Subtitle URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/subtitles-spanish.vtt"
              value={newLanguage.subtitleUrl}
              onChange={(e) => setNewLanguage({...newLanguage, subtitleUrl: e.target.value})}
            />
            <small>WebVTT format (.vtt)</small>
          </div>

          <button className="btn-primary" onClick={handleAddLanguage}>
            Add Language
          </button>
        </div>
      )}

      <div className="languages-list">
        {languages.map(lang => (
          <div key={lang.code} className="language-item">
            <div className="language-info">
              <h4>{lang.name}</h4>
              <span className="language-code">{lang.code.toUpperCase()}</span>
            </div>

            <div className="language-urls">
              <div className="url-field">
                <label>Audio:</label>
                <input
                  type="url"
                  placeholder="Audio URL"
                  value={lang.audioUrl || ''}
                  onChange={(e) => handleUpdateLanguage(lang.code, 'audioUrl', e.target.value)}
                />
              </div>
              <div className="url-field">
                <label>Subtitles:</label>
                <input
                  type="url"
                  placeholder="Subtitle URL (.vtt)"
                  value={lang.subtitleUrl || ''}
                  onChange={(e) => handleUpdateLanguage(lang.code, 'subtitleUrl', e.target.value)}
                />
              </div>
            </div>

            {languages.length > 1 && (
              <button 
                className="btn-remove"
                onClick={() => handleRemoveLanguage(lang.code)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="language-info-box">
        <h4>ℹ️ How it works:</h4>
        <ul>
          <li><strong>Audio URL:</strong> Link to dubbed version in that language</li>
          <li><strong>Subtitle URL:</strong> Link to subtitle file (.vtt format)</li>
          <li>Users can switch languages in the video player</li>
          <li>If no audio URL, original audio plays with subtitles</li>
        </ul>
      </div>
    </div>
  )
}

export default MovieLanguageManager
