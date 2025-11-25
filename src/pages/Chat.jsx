import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

const Chat = ({ user, isTutor }) => {
  const { tutorId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef(null)

  const tutor = {
    id: parseInt(tutorId) || 1,
    name: isTutor ? 'Student User' : 'Dr. Sarah Johnson',
    role: isTutor ? 'Student' : 'Tutor'
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Initialize messages only once
  useEffect(() => {
    if (!isInitialized) {
      const currentTime = new Date().getTime()
      const initialMessages = [
        {
          id: 1,
          text: isTutor 
            ? 'Hello! I need help with my math homework.' 
            : 'Hello! I would like to discuss math tutoring.',
          sender: isTutor ? 'student' : 'user',
          timestamp: new Date(currentTime - 3600000).toLocaleTimeString(),
          isUser: !isTutor
        },
        {
          id: 2,
          text: isTutor
            ? 'I would be happy to help you with mathematics. What specific topics are you struggling with?'
            : 'Hi there! I would be happy to help you with mathematics. What specific topics are you struggling with?',
          sender: isTutor ? 'tutor' : 'tutor',
          timestamp: new Date(currentTime - 3500000).toLocaleTimeString(),
          isUser: isTutor
        }
      ]
      
      // Use setTimeout to defer the state update
      setTimeout(() => {
        setMessages(initialMessages)
        setIsInitialized(true)
      }, 0)
    }
  }, [tutorId, isTutor, isInitialized])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: user.name,
        timestamp: new Date().toLocaleTimeString(),
        isUser: true
      }
      
      // Use functional update to avoid dependencies
      setMessages(prev => [...prev, message])
      setNewMessage('')

      // Simulate response after delay
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          text: isTutor 
            ? "Thanks for your message! I'll review it and get back to you shortly."
            : `Thank you for your message${user.name ? `, ${user.name}` : ''}! I'd be happy to help you with that.`,
          sender: isTutor ? 'student' : 'tutor',
          timestamp: new Date().toLocaleTimeString(),
          isUser: false
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  const chatTitle = isTutor ? `Chat with Student` : `Chat with Tutor`

  return (
    <div className="page-container">
      <div className="container px-4 py-8 max-w-4xl">
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black mb-2">{chatTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="avatar avatar-sm">
                    <span>{tutor.name.charAt(0)}</span>
                  </div>
                  <span className="text-black">{tutor.name}</span>
                </div>
                <span>•</span>
                <span>Chat ID: <strong className="text-black">{tutorId}</strong></span>
                <span>•</span>
                <span>Your Role: <strong className="text-black">{isTutor ? 'Tutor' : 'Student'}</strong></span>
              </div>
            </div>
            <Link
              to={isTutor ? "/inbox" : "/tutors"}
              className="btn btn-outline"
            >
              Back to {isTutor ? 'Inbox' : 'Tutors'}
            </Link>
          </div>
        </div>

        <div className="chat-window">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <div className="text-black">
                <strong>Chatting with:</strong> {tutor.name}
              </div>
              <div className="text-gray-600">
                {messages.length} messages
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-6 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <div>
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="text-black font-medium">No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex max-w-xs lg:max-w-md">
                      {!message.isUser && (
                        <div className="flex-shrink-0 mr-3">
                          <div className="avatar avatar-sm">
                            <span>{tutor.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div
                        className={`chat-bubble ${message.isUser ? 'chat-bubble-user' : 'chat-bubble-other'}`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="flex-shrink-0 ml-3">
                          <div className="avatar avatar-sm bg-success">
                            <span>{user.name?.charAt(0) || 'U'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type your message as ${isTutor ? 'a tutor' : 'a student'}...`}
                className="form-input flex-1"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat