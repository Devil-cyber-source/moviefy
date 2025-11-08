import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const token = authAPI.getToken()
        if (token) {
          const userData = authAPI.getCurrentUser()
          setCurrentUser(userData)
        }
      } catch (error) {
        console.error('Error loading user:', error)
        authAPI.logout()
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email)
      const data = await authAPI.login(email, password)
      console.log('✅ Login response:', data)
      
      if (data.success) {
        setCurrentUser(data.user)
        console.log('✅ User logged in:', data.user.name)
        return { success: true }
      }
      console.log('❌ Login failed:', data.error)
      return { success: false, error: data.error || 'Login failed' }
    } catch (error) {
      console.error('❌ API login error:', error)
      console.log('⚠️ Falling back to demo mode')
      
      // Fallback to demo mode if backend is not available
      if (email === 'admin@moviefy.com' && password === 'admin123') {
        const demoUser = {
          _id: '1',
          name: 'Admin User',
          email: 'admin@moviefy.com',
          role: 'admin',
          subscription: { plan: 'premium', status: 'active' }
        }
        setCurrentUser(demoUser)
        localStorage.setItem('user', JSON.stringify(demoUser))
        console.log('✅ Demo mode login successful')
        return { success: true }
      }
      
      return { success: false, error: 'Invalid credentials. Backend: ' + error.message }
    }
  }

  const signup = async (email, password, name, referralCode = null) => {
    try {
      const data = await authAPI.register(name, email, password, referralCode)
      if (data.success) {
        setCurrentUser(data.user)
        return { success: true }
      }
      return { success: false, error: data.error || 'Signup failed' }
    } catch (error) {
      console.error('API error, using demo mode:', error)
      // Fallback to demo mode
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }
      const demoUser = {
        _id: Date.now().toString(),
        name: name,
        email: email,
        authProvider: 'email',
        role: 'user',
        subscription: { plan: 'free', status: 'trial' }
      }
      setCurrentUser(demoUser)
      localStorage.setItem('user', JSON.stringify(demoUser))
      return { success: true }
    }
  }

  const loginWithGoogleOAuth = async (googleUser) => {
    try {
      console.log('Processing Google OAuth login with API...')
      const data = await authAPI.googleAuth(googleUser)
      if (data.success) {
        setCurrentUser(data.user)
        console.log('✅ Google login successful!')
        return { success: true }
      }
      return { success: false, error: data.error || 'Google login failed' }
    } catch (error) {
      console.error('❌ API error, using demo mode:', error)
      // Fallback to demo mode
      const demoUser = {
        _id: Date.now().toString(),
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        authProvider: 'google',
        role: 'user',
        subscription: { plan: 'free', status: 'trial' }
      }
      setCurrentUser(demoUser)
      localStorage.setItem('user', JSON.stringify(demoUser))
      console.log('✅ Google login successful (demo mode)!')
      return { success: true }
    }
  }

  const loginWithPhone = async (phone, otp) => {
    try {
      const data = await authAPI.phoneAuth(phone, otp)
      if (data.success) {
        setCurrentUser(data.user)
        return { success: true }
      }
      return { success: false, error: data.error || 'Phone login failed' }
    } catch (error) {
      console.error('API error, using demo mode:', error)
      // Fallback to demo mode
      if (otp !== '123456') {
        return { success: false, error: 'Invalid OTP' }
      }
      const demoUser = {
        _id: Date.now().toString(),
        name: 'Phone User',
        email: `${phone}@moviefy.phone`,
        phone: phone,
        authProvider: 'phone',
        role: 'user',
        subscription: { plan: 'free', status: 'trial' }
      }
      setCurrentUser(demoUser)
      localStorage.setItem('user', JSON.stringify(demoUser))
      return { success: true }
    }
  }

  const logout = () => {
    authAPI.logout()
    setCurrentUser(null)
  }

  const addToMyList = async (movieId) => {
    try {
      // Update locally first for instant feedback
      setCurrentUser(prev => ({
        ...prev,
        myList: [...(prev.myList || []), movieId]
      }))

      // Then update on server
      // await userAPI.addToMyList(movieId)
    } catch (error) {
      console.error('Error adding to list:', error)
      // Revert on error
      setCurrentUser(prev => ({
        ...prev,
        myList: prev.myList.filter(id => id !== movieId)
      }))
    }
  }

  const removeFromMyList = async (movieId) => {
    try {
      // Update locally first
      setCurrentUser(prev => ({
        ...prev,
        myList: prev.myList.filter(id => id !== movieId)
      }))

      // Then update on server
      // await userAPI.removeFromMyList(movieId)
    } catch (error) {
      console.error('Error removing from list:', error)
      // Revert on error
      setCurrentUser(prev => ({
        ...prev,
        myList: [...(prev.myList || []), movieId]
      }))
    }
  }

  const updateSubscription = async (plan) => {
    try {
      // Update locally first
      const planDurations = { basic: 30, standard: 30, premium: 30 }
      const bonusDays = (currentUser.referral?.rewards || 0) * 30
      const totalDays = planDurations[plan] + bonusDays

      setCurrentUser(prev => ({
        ...prev,
        subscription: {
          plan,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + totalDays * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true
        },
        referral: {
          ...prev.referral,
          rewards: 0,
          hasPurchased: true
        }
      }))

      // Then update on server
      // await userAPI.updateSubscription(plan)
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authAPI.getToken()}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await response.json()

      if (data.success) {
        // Update user to indicate they now have a password
        setCurrentUser(prev => ({
          ...prev,
          hasPassword: true
        }))
        return { success: true }
      }

      return { success: false, error: data.error || 'Failed to change password' }
    } catch (error) {
      console.error('Change password error:', error)
      return { success: false, error: 'Failed to change password. Please try again.' }
    }
  }

  const value = {
    currentUser,
    login,
    signup,
    loginWithGoogleOAuth,
    loginWithPhone,
    logout,
    changePassword,
    addToMyList,
    removeFromMyList,
    updateSubscription
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
