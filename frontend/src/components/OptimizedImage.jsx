import { useState, useRef, useEffect } from 'react'
import './OptimizedImage.css'

function OptimizedImage({ src, alt, className = '', fallback = '/placeholder.jpg' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setIsError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`optimized-image ${className}`}>
      {!isLoaded && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      
      {isInView && (
        <img
          src={isError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`image ${isLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
        />
      )}
    </div>
  )
}

export default OptimizedImage
