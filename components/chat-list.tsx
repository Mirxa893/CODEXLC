'use client'

import ChatMessage from '@/components/chat-message' // Make sure this is default export
import { type Message } from 'ai'

interface ChatListProps {
  messages: Message[]
}

export function ChatList({ messages }: ChatListProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">No messages yet</p>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={{
              ...message,
              createdAt: new Date(message.createdAt), // optional safety if type mismatches
            }}
          />
        ))
      )}
    </div>
  )
}
