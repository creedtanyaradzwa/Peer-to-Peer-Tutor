import React, { useState } from 'react'

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    isTutor: false,
    subjects: '',
    bio: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Test User',
      email: formData.email,
      isTutor: formData.isTutor,
      subjects: formData.subjects ? formData.subjects.split(',') : [],
      bio: formData.bio
    }
    onLogin(userData, formData.isTutor)
  }

  return (
    <div className="page-container">
      <div className="container px-4 py-8 max-w-md">
        <div className="auth-form p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Join our tutoring community'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isTutor"
                      checked={formData.isTutor}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="text-black">Register as Tutor</span>
                  </label>
                </div>

                {formData.isTutor && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Subjects (comma separated)</label>
                      <input
                        type="text"
                        name="subjects"
                        value={formData.subjects}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Math, Science, English"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-input form-textarea"
                        rows="3"
                        placeholder="Tell students about your teaching experience..."
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mb-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="btn btn-ghost w-full"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister