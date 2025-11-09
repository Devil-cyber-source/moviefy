// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: `${API_URL}/api/auth`,
  MOVIES: `${API_URL}/api/movies`,
  USERS: `${API_URL}/api/users`,
  UPLOAD: `${API_URL}/api/upload`,
  PAYMENT: `${API_URL}/api/payment`,
  HEALTH: `${API_URL}/api/health`
}

export default API_URL
