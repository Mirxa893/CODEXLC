'use client'

import ChatMessage from '@/components/chat-message' // ✅ default import
import { useChatMessages } from '@/lib/hooks/use-chat-messages'

interface ChatListProps {
  chatId: string
}

export function ChatList({ chatId }: ChatListProps) {
  const { messages } = useChatMessages(chatId)

  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.length === 0 && (
        <p className="text-sm text-gray-400 text-center">No messages yet</p>
      )}
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}
