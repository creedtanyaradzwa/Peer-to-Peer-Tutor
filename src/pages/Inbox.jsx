import React from 'react'
import { Link } from 'react-router-dom'

const Inbox = ({ user, isTutor }) => {
  // Mock conversations - now using the user and isTutor props
  const conversations = [
    {
      id: 1,
      tutorId: 1,
      tutorName: 'Dr. Sarah Johnson',
      userName: user?.name || 'Student',
      lastMessage: `Hi ${user?.name || 'there'}! I can help you with calculus.`,
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      tutorId: 2,
      tutorName: 'Prof. Mike Chen',
      userName: user?.name || 'Student', 
      lastMessage: `Let me know when you want to schedule the next session, ${user?.name || 'there'}.`,
      timestamp: '1 day ago',
      unread: false
    }
  ]

  // Filter conversations based on user type
  const userConversations = isTutor 
    ? conversations.filter(conv => conv.tutorName.includes('Prof.') || conv.tutorName.includes('Dr.'))
    : conversations

  const inboxTitle = isTutor ? 'Student Messages' : 'Tutor Messages'
  const emptyMessage = isTutor 
    ? 'No student messages yet.' 
    : 'No messages yet. Start a conversation with a tutor!'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{inboxTitle}</h1>
        <div className="text-sm text-gray-600">
          Logged in as: <span className="font-semibold">{user?.name}</span> 
          ({isTutor ? 'Tutor' : 'Student'})
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        {userConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-lg mb-2">{emptyMessage}</p>
            {!isTutor && (
              <Link 
                to="/tutors" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Find tutors to message →
              </Link>
            )}
          </div>
        ) : (
          userConversations.map(conversation => (
            <Link
              key={conversation.id}
              to={`/chat/${conversation.tutorId}`}
              className="block border-b hover:bg-gray-50 transition-colors"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-lg mr-2">
                        {isTutor ? conversation.userName : conversation.tutorName}
                      </h3>
                      {conversation.unread && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Quick Stats */}
      {userConversations.length > 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm text-blue-800">
            <div>
              <span className="font-semibold">Total conversations:</span> {userConversations.length}
            </div>
            <div>
              <span className="font-semibold">Unread:</span> {userConversations.filter(c => c.unread).length}
            </div>
            <div>
              <span className="font-semibold">User Type:</span> {isTutor ? 'Tutor' : 'Student'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inbox