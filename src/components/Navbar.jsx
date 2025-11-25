import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ user, isTutor, logout }) => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="text-xl font-bold text-black">TutorConnect</Link>
          
          <div className="navbar-links">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                {!isTutor && (
                  <Link 
                    to="/tutors" 
                    className={`navbar-link ${location.pathname === '/tutors' ? 'active' : ''}`}
                  >
                    Find Tutors
                  </Link>
                )}
                <Link 
                  to="/inbox" 
                  className={`navbar-link ${location.pathname === '/inbox' ? 'active' : ''}`}
                >
                  Inbox
                </Link>
                <Link 
                  to="/profile" 
                  className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}
                >
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="navbar-link"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar