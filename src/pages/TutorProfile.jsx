import React from 'react'
import { useParams, Link } from 'react-router-dom'

const TutorProfile = () => {
  const { id } = useParams()
  
  // Mock tutor data - in real app, fetch by ID
  const tutor = {
    id: parseInt(id) || 1, // Now using the id from URL params
    name: 'Dr. Sarah Johnson',
    subjects: ['Mathematics', 'Physics', 'Calculus'],
    rating: 4.9,
    bio: 'PhD in Mathematics with 10 years of teaching experience at university level. Specialized in advanced mathematics and physics.',
    price: '$50/hr',
    experience: '10 years',
    education: 'PhD in Mathematics, MIT',
    availability: 'Mon-Fri: 3 PM - 8 PM, Weekends: 10 AM - 4 PM'
  }

  // If we had an API, we would fetch tutor data like this:
  // useEffect(() => {
  //   const fetchTutor = async () => {
  //     const response = await fetch(`/api/tutors/${id}`)
  //     const tutorData = await response.json()
  //     setTutor(tutorData)
  //   }
  //   fetchTutor()
  // }, [id])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg">⭐ {tutor.rating}</span>
              <span className="mx-3 text-gray-400">•</span>
              <span className="text-green-600 font-semibold text-lg">{tutor.price}</span>
            </div>
          </div>
          <Link
            to={`/chat/${tutor.id}`}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Start Chat
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 mb-6">{tutor.bio}</p>
            
            <h2 className="text-xl font-semibold mb-3">Subjects</h2>
            <div className="mb-6">
              {tutor.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Details</h2>
            <div className="space-y-3">
              <div>
                <strong>Experience:</strong> {tutor.experience}
              </div>
              <div>
                <strong>Education:</strong> {tutor.education}
              </div>
              <div>
                <strong>Availability:</strong> {tutor.availability}
              </div>
              <div>
                <strong>Tutor ID:</strong> {tutor.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorProfile