import React, { useState } from 'react'
import TutorCard from '../components/TutorCard'

const TutorList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const mockTutors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subjects: ['Mathematics', 'Physics', 'Calculus'],
      rating: 4.9,
      bio: 'PhD in Mathematics with 10 years of teaching experience at university level.',
      price: '$50/hr',
      experience: '10 years'
    },
    {
      id: 2,
      name: 'Prof. Mike Chen',
      subjects: ['Computer Science', 'Programming', 'Web Development'],
      rating: 4.8,
      bio: 'Software engineer and part-time coding instructor with 5 years of industry experience.',
      price: '$45/hr',
      experience: '5 years'
    },
    {
      id: 3,
      name: 'Emily Davis',
      subjects: ['English', 'Literature', 'Writing'],
      rating: 4.7,
      bio: 'English literature graduate and writing coach with 3 years of teaching experience.',
      price: '$40/hr',
      experience: '3 years'
    }
  ]

  const filteredTutors = mockTutors.filter(tutor =>
    tutor.subjects.some(subject =>
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-container">
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">Find Tutors</h1>
          <p className="text-gray-600 mb-6">
            Browse our verified tutors and find the perfect match for your learning needs.
          </p>
          
          <div className="max-w-md">
            <div className="form-group">
              <input
                type="text"
                placeholder="Search by subject or tutor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">No tutors found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all tutors.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorList