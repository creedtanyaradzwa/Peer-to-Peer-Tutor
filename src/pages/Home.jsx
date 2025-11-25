import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="page-container">
      <div className="container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome to TutorConnect
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with expert tutors for personalized learning experiences. 
            Achieve your academic goals with our dedicated tutoring platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">For Students</h3>
            <p className="text-gray-600 mb-6">
              Find the perfect tutor for your learning needs and schedule sessions easily.
            </p>
            <Link 
              to="/login" 
              className="btn btn-primary btn-lg"
            >
              Get Started as Student
            </Link>
          </div>
          
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <h3 className="text-2xl font-semibold text-black mb-4">For Tutors</h3>
            <p className="text-gray-600 mb-6">
              Share your knowledge and help students achieve their academic goals.
            </p>
            <Link 
              to="/login" 
              className="btn btn-primary btn-lg"
            >
              Become a Tutor
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white card p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6">Why Choose TutorConnect?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">⚡</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Quick Matching</h4>
                <p className="text-sm text-gray-600">Find your perfect tutor in minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">💬</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600">Instant communication with tutors</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">🛡️</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Verified Tutors</h4>
                <p className="text-sm text-gray-600">All tutors are thoroughly vetted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home