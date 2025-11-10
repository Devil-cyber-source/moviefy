// Simple in-memory rate limiter
const requestCounts = new Map()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.resetTime > 60000) {
      requestCounts.delete(key)
    }
  }
}, 300000)

export const rateLimiter = (options = {}) => {
  const {
    windowMs = 60000, // 1 minute
    max = 100, // 100 requests per minute
    message = 'Too many requests, please try again later.'
  } = options

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress
    const now = Date.now()
    
    if (!requestCounts.has(key)) {
      requestCounts.set(key, {
        count: 1,
        resetTime: now + windowMs
      })
      return next()
    }
    
    const data = requestCounts.get(key)
    
    if (now > data.resetTime) {
      data.count = 1
      data.resetTime = now + windowMs
      return next()
    }
    
    if (data.count >= max) {
      return res.status(429).json({
        error: message,
        retryAfter: Math.ceil((data.resetTime - now) / 1000)
      })
    }
    
    data.count++
    next()
  }
}

// Stricter rate limit for auth endpoints
export const authRateLimiter = rateLimiter({
  windowMs: 900000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again after 15 minutes.'
})
