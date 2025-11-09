import { useState, useEffect } from 'react'
import './Toast.css'

let toastQueue = []
let setToastsGlobal = null

export const showToast = (message, type = 'info') => {
  const id = Date.now()
  const toast = { id, message, type }
  toastQueue.push(toast)
  if (setToastsGlobal) {
    setToastsGlobal([...toastQueue])
  }
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== id)
    if (setToastsGlobal) {
      setToastsGlobal([...toastQueue])
    }
  }, 3000)
}

function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    setToastsGlobal = setToasts
    return () => {
      setToastsGlobal = null
    }
  }, [])

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'info' && 'ℹ'}
            {toast.type === 'warning' && '⚠'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}

export default Toast
