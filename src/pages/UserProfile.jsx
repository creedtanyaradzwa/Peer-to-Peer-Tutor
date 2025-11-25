import React, { useState } from 'react'

const UserProfile = ({ user, isTutor }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    subjects: user.subjects ? user.subjects.join(', ') : ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="page-container">
      <div className="container px-4 py-8 max-w-2xl">
        <div className="card p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Profile</h1>
              <p className="text-gray-600">
                Manage your account information and preferences
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {isTutor && (
                <>
                  <div className="form-group">
                    <label className="form-label">Subjects (comma separated)</label>
                    <input
                      type="text"
                      name="subjects"
                      value={profileData.subjects}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Math, Science, English"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="form-input form-textarea"
                      placeholder="Tell students about your teaching experience and approach..."
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="avatar avatar-lg">
                  <span>{user.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-black">{profileData.name}</h2>
                  <p className="text-gray-600">{isTutor ? 'Tutor' : 'Student'}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-black mb-2">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Name:</label>
                      <p className="text-black">{profileData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email:</label>
                      <p className="text-black">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Role:</label>
                      <p className="text-black">{isTutor ? 'Tutor' : 'Student'}</p>
                    </div>
                  </div>
                </div>

                {isTutor && (
                  <div>
                    <h3 className="font-semibold text-black mb-2">Tutor Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Subjects:</label>
                        <p className="text-black">{profileData.subjects || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Bio:</label>
                        <p className="text-black">{profileData.bio || 'No bio provided'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Actions */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-semibold text-black mb-4">Account Actions</h3>
                <div className="flex gap-3">
                  <button className="btn btn-primary">
                    Change Password
                  </button>
                  <button className="btn btn-outline">
                    Notification Settings
                  </button>
                  {isTutor && (
                    <button className="btn btn-outline">
                      Availability Settings
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile