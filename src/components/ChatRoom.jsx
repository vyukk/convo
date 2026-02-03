import React from 'react'
import { listenMessages, sendMessage, ensureChatExists } from '../services/ChatService'
import Message from './Message'

export default function ChatRoom({ chatId, user }) {
  const [messages, setMessages] = React.useState([])
  const [text, setText] = React.useState('')
  const listRef = React.useRef(null)

  React.useEffect(() => {
    if (!chatId) return
    ensureChatExists(chatId, { roomName: chatId }).catch(() => {})
    const unsub = listenMessages(chatId, setMessages)
    return () => unsub()
  }, [chatId])

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await sendMessage(chatId, text.trim(), user)
    setText('')
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <header className="px-4 py-3 border-b bg-gradient-to-r from-indigo-50 to-white shadow-sm">
        <h4 className="font-semibold text-gray-800">Room: {chatId}</h4>
      </header>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No messages yet. Say hello 👋
          </div>
        )}

        {messages.map((msg) => {
          const isOwn = msg.senderId === user.uid
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              {!isOwn && (
                <img
                  src={msg.senderPhoto || 'https://www.gravatar.com/avatar/?d=mp'}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`max-w-xs break-words px-4 py-2 rounded-lg ${
                  isOwn ? 'bg-indigo-600 text-white' : 'bg-white border'
                }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {msg.timestamp?.toDate
                    ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t bg-white flex items-center gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  )
}
