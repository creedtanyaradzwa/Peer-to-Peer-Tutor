import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import DashboardPage from './pages/DashboardPage'
import TutorList from './pages/TutorList'
import TutorProfile from './pages/TutorProfile'
import UserProfile from './pages/UserProfile'
import Inbox from './pages/Inbox'
import Chat from './pages/Chat'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)
  const [isTutor, setIsTutor] = useState(false)

  const login = (userData, tutorStatus) => {
    setUser(userData)
    setIsTutor(tutorStatus)
  }

  const logout = () => {
    setUser(null)
    setIsTutor(false)
  }

  return (
    <Router>
      <div className="min-h-screen bg-light-purple">
        <Navbar user={user} isTutor={isTutor} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={!user ? <LoginRegister onLogin={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <DashboardPage user={user} isTutor={isTutor} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tutors" 
            element={user ? <TutorList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tutor/:id" 
            element={user ? <TutorProfile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <UserProfile user={user} isTutor={isTutor} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/inbox" 
            element={user ? <Inbox user={user} isTutor={isTutor} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/chat/:tutorId" 
            element={user ? <Chat user={user} isTutor={isTutor} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App