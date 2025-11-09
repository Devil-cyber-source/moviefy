import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './WatchParty.css'

function WatchParty() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { partyId } = useParams()
  const [partyCode, setPartyCode] = useState('')
  const [activeParty, setActiveParty] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    if (partyId) {
      loadParty(partyId)
    }
  }, [partyId])

  const createParty = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const party = {
      id: code,
      host: currentUser.email,
      members: [currentUser.name],
      createdAt: new Date().toISOString()
    }
    
    const parties = JSON.parse(localStorage.getItem('watchParties') || '[]')
    parties.push(party)
    localStorage.setItem('watchParties', JSON.stringify(parties))
    
    setActiveParty(party)
    setPartyCode(code)
  }

  const joinParty = () => {
    const parties = JSON.parse(localStorage.getItem('watchParties') || '[]')
    const party = parties.find(p => p.id === partyCode.toUpperCase())
    
    if (party) {
      if (!party.members.includes(currentUser.name)) {
        party.members.push(currentUser.name)
        localStorage.setItem('watchParties', JSON.stringify(parties))
      }
      setActiveParty(party)
    } else {
      alert('Party not found!')
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const msg = {
        user: currentUser.name,
        text: newMessage,
        time: new Date().toLocaleTimeString()
      }
      setMessages([...messages, msg])
      setNewMessage('')
    }
  }

  const copyPartyLink = () => {
    const link = `${window.location.origin}/watch-party/${activeParty.id}`
    navigator.clipboard.writeText(link)
    alert('Party link copied! Share with friends.')
  }

  return (
    <div className="watch-party-page">
      <div className="party-header">
        <h1 className="logo" onClick={() => navigate('/')}>MOVIEFY</h1>
        <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
      </div>

      <div className="party-container">
        {!activeParty ? (
          <div className="party-setup">
            <div className="party-hero">
              <h1>🎉 Watch Party</h1>
              <p>Watch movies together with friends in real-time!</p>
            </div>

            <div className="party-actions">
              <div className="action-card">
                <h3>Create a Party</h3>
                <p>Start a new watch party and invite friends</p>
                <button onClick={createParty} className="btn-create">
                  Create Party
                </button>
              </div>

              <div className="divider">OR</div>

              <div className="action-card">
                <h3>Join a Party</h3>
                <p>Enter the party code to join</p>
                <input
                  type="text"
                  placeholder="Enter Party Code"
                  value={partyCode}
                  onChange={(e) => setPartyCode(e.target.value.toUpperCase())}
                  maxLength="6"
                />
                <button onClick={joinParty} className="btn-join">
                  Join Party
                </button>
              </div>
            </div>

            <div className="party-features">
              <h3>Features:</h3>
              <ul>
                <li>✓ Synchronized playback</li>
                <li>✓ Live chat with friends</li>
                <li>✓ See who's watching</li>
                <li>✓ Share reactions</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="active-party">
            <div className="party-info">
              <h2>Party Code: {activeParty.id}</h2>
              <button onClick={copyPartyLink} className="btn-copy-link">
                📋 Copy Link
              </button>
            </div>

            <div className="party-content">
              <div className="video-section">
                <div className="video-placeholder">
                  <h3>🎬 Select a movie to start watching</h3>
                  <button onClick={() => navigate('/')} className="btn-select">
                    Browse Movies
                  </button>
                </div>
              </div>

              <div className="chat-section">
                <div className="members-list">
                  <h4>Watching ({activeParty.members.length})</h4>
                  {activeParty.members.map((member, i) => (
                    <div key={i} className="member">
                      <span className="member-avatar">👤</span>
                      <span>{member}</span>
                      {member === currentUser.name && <span className="you-badge">You</span>}
                    </div>
                  ))}
                </div>

                <div className="chat-box">
                  <div className="messages">
                    {messages.map((msg, i) => (
                      <div key={i} className={`message ${msg.user === currentUser.name ? 'own' : ''}`}>
                        <strong>{msg.user}</strong>
                        <p>{msg.text}</p>
                        <span className="time">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WatchParty
