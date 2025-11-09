import './LoadingSpinner.css'

function LoadingSpinner({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className="netflix-loader">
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
            <div className="loader-bar"></div>
          </div>
          <h2 className="loading-text">MOVIEFY</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
    </div>
  )
}

export default LoadingSpinner
