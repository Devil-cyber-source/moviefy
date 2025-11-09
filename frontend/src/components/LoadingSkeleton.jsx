import './LoadingSkeleton.css'

function LoadingSkeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    )
  }

  if (type === 'row') {
    return (
      <div className="skeleton-row">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image"></div>
          </div>
        ))}
      </div>
    )
  }

  return <div className="skeleton-spinner"></div>
}

export default LoadingSkeleton
