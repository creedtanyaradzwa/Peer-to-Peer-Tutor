import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = ({ user, isTutor }) => {
  return (
    <div className="page-container">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! {isTutor ? 'Manage your tutoring sessions' : 'Continue your learning journey'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isTutor ? (
            // Student Dashboard
            <>
              <Link to="/tutors" className="dashboard-card p-6 block">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Find Tutors</h3>
                <p className="text-gray-600">Browse and connect with available tutors</p>
              </Link>
              
              <Link to="/inbox" className="dashboard-card p-6 block">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Messages</h3>
                <p className="text-gray-600">Check your conversations with tutors</p>
              </Link>
              
              <div className="dashboard-card p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">My Sessions</h3>
                <p className="text-gray-600">View your scheduled tutoring sessions</p>
              </div>
            </>
          ) : (
            // Tutor Dashboard
            <>
              <div className="dashboard-card p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">My Students</h3>
                <p className="text-gray-600">View your current students</p>
              </div>
              
              <Link to="/inbox" className="dashboard-card p-6 block">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Messages</h3>
                <p className="text-gray-600">Check your conversations with students</p>
              </Link>
              
              <div className="dashboard-card p-6">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Schedule</h3>
                <p className="text-gray-600">Manage your availability and sessions</p>
              </div>
            </>
          )}
          
          <Link to="/profile" className="dashboard-card p-6 block">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">👤</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Profile</h3>
            <p className="text-gray-600">Update your personal information</p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-black mb-2">5</div>
            <div className="text-gray-600">Active Sessions</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-black mb-2">12</div>
            <div className="text-gray-600">Total Hours</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-black mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage