import React from 'react'
import { Link } from 'react-router-dom'

const TutorCard = ({ tutor, showActions = true }) => {
  const {
    id,
    name,
    subjects,
    rating,
    bio,
    price,
    experience,
    image
  } = tutor

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Tutor Image and Basic Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Tutor Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              {image ? (
                <img 
                  src={image} 
                  alt={name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-blue-600 text-xl font-bold">
                  {name.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Tutor Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {name}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-green-600 font-semibold text-sm">
                    {price}
                  </span>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {subjects.slice(0, 3).map((subject, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {subject}
                  </span>
                ))}
                {subjects.length > 3 && (
                  <span className="inline-block bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
                    +{subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Bio Preview */}
            {bio && (
              <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                {bio}
              </p>
            )}

            {/* Experience */}
            {experience && (
              <div className="mt-2 text-sm text-gray-500">
                📚 {experience} experience
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Link
              to={`/tutor/${id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Full Profile
            </Link>
            <div className="flex space-x-2">
              <Link
                to={`/tutor/${id}`}
                className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                View Details
              </Link>
              <Link
                to={`/chat/${id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Message
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Default props
TutorCard.defaultProps = {
  showActions: true
}

export default TutorCard