import { useState } from 'react'

function GoogleLoginButton({ onSuccess, onError }) {
  const [isLoading, setIsLoading] = useState(false)
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

  // Check if Google OAuth is configured
  const isGoogleConfigured = !!GOOGLE_CLIENT_ID

  const handleClick = async () => {
    if (!isGoogleConfigured) {
      // Fallback to demo mode
      if (onError) {
        onError({ error: 'google_not_configured' })
      }
      return
    }

    // If configured, use real Google OAuth
    try {
      const { useGoogleLogin } = await import('@react-oauth/google')
      const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          setIsLoading(true)
          try {
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`
              }
            })
            
            const userInfo = await userInfoResponse.json()
            console.log('Google user info:', userInfo)
            
            if (onSuccess) {
              onSuccess(userInfo)
            }
          } catch (error) {
            console.error('Error fetching user info:', error)
            if (onError) {
              onError(error)
            }
          } finally {
            setIsLoading(false)
          }
        },
        onError: (error) => {
          console.error('Google login error:', error)
          if (onError) {
            onError(error)
          }
        },
        flow: 'implicit'
      })
      login()
    } catch (error) {
      console.error('Google OAuth error:', error)
      if (onError) {
        onError(error)
      }
    }
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
