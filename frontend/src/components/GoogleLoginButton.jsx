import { useState } from 'react'

function GoogleLoginButton({ onSuccess, onError }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    
    // Create a demo Google user immediately
    console.log('🔵 Google login clicked - using instant demo mode')
    
    const demoGoogleUser = {
      email: `google.user.${Date.now()}@gmail.com`,
      name: 'Google User',
      picture: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff&size=128',
      sub: 'google_demo_' + Date.now(),
      email_verified: true
    }
    
    // Simulate a brief loading for better UX
    setTimeout(() => {
      console.log('✅ Google demo user created:', demoGoogleUser)
      setIsLoading(false)
      if (onSuccess) {
        onSuccess(demoGoogleUser)
      }
    }, 500)
  }

  return (
    <button 
      type="button" 
      className="auth-social-button google-button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
        <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
      </svg>
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </button>
  )
}

export default GoogleLoginButton
