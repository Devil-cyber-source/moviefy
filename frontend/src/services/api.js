// API Configuration
// Use environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_URL = `${BASE_URL}/api`;

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Authentication API
export const authAPI = {
  async login(email, password) {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(name, email, password, referralCode = null) {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, referralCode })
    });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async googleAuth(googleUser) {
    const data = await apiCall('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        googleId: googleUser.sub
      })
    });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async phoneAuth(phone, otp) {
    const data = await apiCall('/auth/phone', {
      method: 'POST',
      body: JSON.stringify({ phone, otp })
    });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async getMe() {
    return apiCall('/auth/me');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!getToken();
  }
};

// Movies API
export const moviesAPI = {
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters);
    return apiCall(`/movies?${params}`);
  },

  async getById(id) {
    return apiCall(`/movies/${id}`);
  },

  async create(movieData) {
    return apiCall('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData)
    });
  },

  async update(id, movieData) {
    return apiCall(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movieData)
    });
  },

  async delete(id) {
    return apiCall(`/movies/${id}`, {
      method: 'DELETE'
    });
  }
};

// Upload API
export const uploadAPI = {
  async uploadVideo(formData, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const token = getToken();

      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(JSON.parse(xhr.responseText).error));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${API_URL}/upload/video`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  }
};

// User API
export const userAPI = {
  async getProfile() {
    return apiCall('/users/profile');
  },

  async addToMyList(movieId) {
    return apiCall(`/users/mylist/${movieId}`, {
      method: 'POST'
    });
  },

  async removeFromMyList(movieId) {
    return apiCall(`/users/mylist/${movieId}`, {
      method: 'DELETE'
    });
  }
};

// Example usage in your React components:
/*

// Login
import { authAPI } from './services/api';

const handleLogin = async (email, password) => {
  try {
    const data = await authAPI.login(email, password);
    console.log('Logged in:', data.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get movies
import { moviesAPI } from './services/api';

const loadMovies = async () => {
  try {
    const movies = await moviesAPI.getAll();
    setMovies(movies);
  } catch (error) {
    console.error('Failed to load movies:', error.message);
  }
};

// Upload video
import { uploadAPI } from './services/api';

const handleUpload = async (formData) => {
  try {
    const result = await uploadAPI.uploadVideo(formData, (percent) => {
      console.log(`Upload progress: ${percent}%`);
      setProgress(percent);
    });
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
};

*/
