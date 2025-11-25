import React, { useState, useEffect, useRef } from 'react'

const ChatWindow = ({ 
  currentChat, 
  currentUser, 
  onSendMessage, 
  onCloseChat,
  isOpen = true 
}) => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Initialize messages only once when component mounts or currentChat changes
    if (!isInitialized && currentChat) {
      const currentTime = new Date().getTime()
      const initialMessages = [
        {
          id: 1,
          text: 'Hello! I would like to discuss math tutoring.',
          sender: 'student',
          timestamp: new Date(currentTime - 3600000).toLocaleTimeString(),
          isUser: true
        },
        {
          id: 2,
          text: 'Hi there! I would be happy to help you with mathematics. What specific topics are you struggling with?',
          sender: 'tutor',
          timestamp: new Date(currentTime - 3500000).toLocaleTimeString(),
          isUser: false
        },
        {
          id: 3,
          text: 'I need help with calculus and algebra.',
          sender: 'student',
          timestamp: new Date(currentTime - 3400000).toLocaleTimeString(),
          isUser: true
        }
      ]
      
      // Use setTimeout to defer the state update
      const timer = setTimeout(() => {
        setMessages(initialMessages)
        setIsInitialized(true)
      }, 0)
      
      return () => clearTimeout(timer)
    }
  }, [currentChat, isInitialized])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && currentChat) {
      const message = {
        id: Date.now(), // Use timestamp for unique ID
        text: newMessage,
        sender: currentUser?.name || 'User',
        timestamp: new Date().toLocaleTimeString(),
        isUser: true
      }
      
      // Optimistically update UI
      setMessages(prev => [...prev, message])
      
      // Call parent handler if provided
      if (onSendMessage) {
        onSendMessage(newMessage, currentChat.id)
      }
      
      setNewMessage('')

      // Simulate auto-reply after 1 second
      setTimeout(() => {
        const autoReply = {
          id: Date.now() + 1,
          text: `Thanks for your message! I'll get back to you soon about ${currentChat.subjects?.[0] || 'your inquiry'}.`,
          sender: currentChat.name,
          timestamp: new Date().toLocaleTimeString(),
          isUser: false
        }
        setMessages(prev => [...prev, autoReply])
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (!isOpen || !currentChat) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {currentChat.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{currentChat.name}</h3>
            <p className="text-blue-100 text-xs">
              {currentChat.subjects?.[0] || 'Tutor'}
            </p>
          </div>
        </div>
        <button
          onClick={onCloseChat}
          className="text-blue-200 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-xs lg:max-w-md">
                {!message.isUser && (
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {currentChat.name.charAt(0)}
                    </div>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {currentUser?.name?.charAt(0) || 'U'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatWindow