import { useEffect } from 'react'

function SEO({ 
  title = 'Moviefy - Stream Movies Online',
  description = 'Watch unlimited movies and TV shows online. Stream the latest releases and classic films in HD quality.',
  keywords = 'movies, streaming, watch online, HD movies, TV shows, entertainment',
  image = '/og-image.jpg',
  url = window.location.href
}) {
  useEffect(() => {
    // Update title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', 'website', true)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('author', 'Moviefy')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
  }, [title, description, keywords, image, url])

  return null
}

export default SEO
