import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Subscription.css'

function Subscription() {
  const { currentUser, updateSubscription } = useAuth()
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(currentUser?.subscription?.plan || 'basic')
  const [isNavigating, setIsNavigating] = useState(false)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$8.99',
      features: [
        'Watch on 1 device',
        'HD available',
        'Unlimited movies and TV shows',
        'Cancel anytime'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$13.99',
      features: [
        'Watch on 2 devices',
        'Full HD available',
        'Unlimited movies and TV shows',
        'Cancel anytime',
        'Download on 2 devices'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$17.99',
      features: [
        'Watch on 4 devices',
        'Ultra HD + HDR',
        'Unlimited movies and TV shows',
        'Cancel anytime',
        'Download on 4 devices',
        'Netflix spatial audio'
      ]
    }
  ]

  const handleSubscribe = () => {
    console.log('=== BUTTON CLICKED ===')
    console.log('Selected Plan:', selectedPlan)
    console.log('Current User:', currentUser?.email)
    console.log('Is Navigating:', isNavigating)
    
    if (!selectedPlan) {
      alert('Please select a plan first')
      return
    }
    
    if (isNavigating) {
      console.log('Already navigating, ignoring click')
      return
    }
    
    setIsNavigating(true)
    console.log('Setting isNavigating to true')
    console.log('Calling navigate() with plan:', selectedPlan)
    
    // Use setTimeout to ensure state updates
    setTimeout(() => {
      try {
        navigate('/checkout', { 
          state: { plan: selectedPlan },
          replace: false 
        })
        console.log('Navigate called successfully')
      } catch (error) {
        console.error('Navigation error:', error)
        alert('Error: ' + error.message)
        setIsNavigating(false)
      }
    }, 100)
  }

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <h1 className="logo" onClick={() => navigate('/')}>MOVIEFY</h1>
        <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
      </div>

      <div className="subscription-container">
        <div className="subscription-intro">
          <h2>Choose the plan that's right for you</h2>
          <p>Watch all you want. Recommendations just for you. Change or cancel your plan anytime.</p>
          
          {/* Debug Info */}
          <div style={{ background: '#2a2a2a', padding: '15px', borderRadius: '8px', marginTop: '20px', fontSize: '14px' }}>
            <p>🔍 Debug Info:</p>
            <p>Selected Plan: <strong>{selectedPlan}</strong></p>
            <p>Current User: <strong>{currentUser?.email}</strong></p>
            <p>Is Navigating: <strong>{isNavigating ? 'Yes' : 'No'}</strong></p>
          </div>
        </div>

        <div className="current-plan">
          <h3>Current Plan: {currentUser?.subscription?.plan?.toUpperCase() || 'FREE TRIAL'}</h3>
          <p>Status: {currentUser?.subscription?.status?.toUpperCase()}</p>
          {currentUser?.subscription?.endDate && (
            <p>Valid until: {new Date(currentUser.subscription.endDate).toLocaleDateString()}</p>
          )}
        </div>

        <div className="plans-grid">
          {plans.map(plan => (
            <div 
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${currentUser?.subscription?.plan === plan.id ? 'current' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {currentUser?.subscription?.plan === plan.id && (
                <div className="current-badge">Current Plan</div>
              )}
              <h3>{plan.name}</h3>
              <div className="plan-price">{plan.price}<span>/month</span></div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              {selectedPlan === plan.id && (
                <div className="selected-indicator">✓ Selected</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={handleSubscribe} 
            className="btn-subscribe"
            type="button"
            disabled={isNavigating}
          >
            {isNavigating ? '⏳ Loading...' : (currentUser?.subscription?.plan === selectedPlan ? 'Renew Plan' : '💳 Proceed to Payment')}
          </button>
          
          <Link 
            to="/checkout"
            state={{ plan: selectedPlan }}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '18px',
              background: '#28a745',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            🧪 Alternative: Use Link Component
          </Link>
          
          <button 
            onClick={() => window.location.href = '/checkout'}
            style={{ 
              width: '100%',
              maxWidth: '400px',
              padding: '18px',
              background: '#ffc107',
              border: 'none',
              borderRadius: '4px',
              color: '#000',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔗 Alternative: Direct URL
          </button>
        </div>

        <div className="accepted-payments">
          <p>We Accept:</p>
          <div className="payment-icons">
            <div className="payment-icon-group">
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
                <rect width="50" height="30" rx="4" fill="#1434CB"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">VISA</text>
              </svg>
            </div>
            <div className="payment-icon-group">
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
                <rect width="50" height="30" rx="4" fill="#EB001B"/>
                <circle cx="18" cy="15" r="10" fill="#FF5F00" opacity="0.8"/>
                <circle cx="32" cy="15" r="10" fill="#F79E1B" opacity="0.8"/>
              </svg>
            </div>
            <div className="payment-icon-group">
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
                <rect width="50" height="30" rx="4" fill="#00BAF2"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Paytm</text>
              </svg>
            </div>
            <div className="payment-icon-group">
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
                <rect width="50" height="30" rx="4" fill="#5F259F"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PhonePe</text>
              </svg>
            </div>
            <div className="payment-icon-group">
              <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
                <rect width="50" height="30" rx="4" fill="#4285F4"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GPay</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription
