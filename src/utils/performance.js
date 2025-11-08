// Performance Optimization Utilities

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy load images
export const lazyLoadImage = (imageElement) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove('lazy')
        observer.unobserve(img)
      }
    })
  })
  
  imageObserver.observe(imageElement)
}

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Cache management
export const cacheManager = {
  set: (key, value, ttl = 3600000) => { // Default 1 hour
    const item = {
      value,
      expiry: Date.now() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  },
  
  get: (key) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null
    
    const item = JSON.parse(itemStr)
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  },
  
  remove: (key) => {
    localStorage.removeItem(key)
  },
  
  clear: () => {
    localStorage.clear()
  }
}

// Performance monitoring
export const performanceMonitor = {
  mark: (name) => {
    if (window.performance && window.performance.mark) {
      window.performance.mark(name)
    }
  },
  
  measure: (name, startMark, endMark) => {
    if (window.performance && window.performance.measure) {
      try {
        window.performance.measure(name, startMark, endMark)
        const measure = window.performance.getEntriesByName(name)[0]
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
        return measure.duration
      } catch (e) {
        console.warn('Performance measurement failed:', e)
      }
    }
  },
  
  clearMarks: () => {
    if (window.performance && window.performance.clearMarks) {
      window.performance.clearMarks()
    }
  }
}

// Network status detection
export const networkStatus = {
  isOnline: () => navigator.onLine,
  
  getConnectionType: () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    return connection ? connection.effectiveType : 'unknown'
  },
  
  isFastConnection: () => {
    const type = networkStatus.getConnectionType()
    return type === '4g' || type === 'wifi'
  }
}

// Memory usage (if available)
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      total: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
    }
  }
  return null
}

// Optimize video loading
export const optimizeVideoLoading = (videoElement) => {
  // Set preload based on connection
  if (networkStatus.isFastConnection()) {
    videoElement.preload = 'metadata'
  } else {
    videoElement.preload = 'none'
  }
  
  // Add loading attribute
  videoElement.loading = 'lazy'
}

// Request Animation Frame wrapper
export const raf = (callback) => {
  return window.requestAnimationFrame(callback)
}

// Cancel Animation Frame wrapper
export const caf = (id) => {
  return window.cancelAnimationFrame(id)
}

// Batch DOM updates
export const batchDOMUpdates = (updates) => {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Smooth scroll to element
export const smoothScrollTo = (element, offset = 0) => {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}

// Local storage with size limit check
export const safeLocalStorage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded')
        // Clear old items
        const keys = Object.keys(localStorage)
        if (keys.length > 0) {
          localStorage.removeItem(keys[0])
          return safeLocalStorage.set(key, value)
        }
      }
      return false
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.warn('Error reading from localStorage:', e)
      return null
    }
  }
}

// Analytics helper
export const trackEvent = (eventName, eventData = {}) => {
  // Store analytics locally for admin dashboard
  const analytics = safeLocalStorage.get('analytics') || []
  analytics.push({
    event: eventName,
    data: eventData,
    timestamp: new Date().toISOString()
  })
  
  // Keep only last 1000 events
  if (analytics.length > 1000) {
    analytics.shift()
  }
  
  safeLocalStorage.set('analytics', analytics)
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', eventName, eventData)
  }
}

// Get analytics data
export const getAnalytics = () => {
  return safeLocalStorage.get('analytics') || []
}

// Clear old analytics data
export const clearOldAnalytics = (daysToKeep = 30) => {
  const analytics = getAnalytics()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)
  
  const filtered = analytics.filter(event => {
    return new Date(event.timestamp) > cutoffDate
  })
  
  safeLocalStorage.set('analytics', filtered)
}
