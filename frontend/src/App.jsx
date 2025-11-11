import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Toast from './components/Toast'
import DatabaseStatus from './components/DatabaseStatus'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import WatchParty from './pages/WatchParty'
import './App.css'

function App() {
  const { currentUser } = useAuth()

  return (
    <ErrorBoundary>
      <DatabaseStatus />
      <Toast />
      <Routes>
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!currentUser ? <Signup /> : <Navigate to="/" />} />
      <Route 
        path="/" 
        element={
          currentUser ? (
            currentUser.role === 'admin' ? <Navigate to="/admin" /> : <Home />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route 
        path="/profile" 
        element={
          currentUser?.role === 'admin' ? <Navigate to="/admin" /> : 
          currentUser ? <Profile /> : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/change-password" 
        element={
          currentUser ? <ChangePassword /> : <Navigate to="/login" />
        } 
      />

      <Route 
        path="/watch-party" 
        element={
          currentUser?.role === 'admin' ? <Navigate to="/admin" /> : 
          currentUser ? <WatchParty /> : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/watch-party/:partyId" 
        element={
          currentUser?.role === 'admin' ? <Navigate to="/admin" /> : 
          currentUser ? <WatchParty /> : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/admin" 
        element={
          currentUser?.role === 'admin' ? <Admin /> : <Navigate to="/" />
        } 
      />
    </Routes>
    </ErrorBoundary>
  )
}

export default App
