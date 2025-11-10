import { useState, useEffect, useRef } from 'react'
import './LazyImage.css'

function LazyImage({ src, alt, className = '', placeholder = '/placeholder.jpg' }) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef()

  useEffect(() => {
    let observer
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image()
              img.src = src
              img.onload = () => {
                setImageSrc(src)
                setImageLoaded(true)
              }
              img.onerror = () => {
                setImageSrc(placeholder)
                setImageLoaded(true)
              }
              observer.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '50px'
        }
      )
      
      observer.observe(imgRef.current)
    }
    
    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, placeholder])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${imageLoaded ? 'loaded' : 'loading'} ${className}`}
      loading="lazy"
    />
  )
}

export default LazyImage
