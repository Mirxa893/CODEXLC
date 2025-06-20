'use client'

import { Message } from 'ai'
import { cn } from '@/lib/utils'

interface ChatListProps {
  messages: Message[]
}

export function ChatList({ messages }: ChatListProps) {
  return (
    <div className="space-y-4 px-4 md:px-6">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className={cn(
            'whitespace-pre-wrap p-4 rounded-lg shadow',
            m.role === 'user' ? 'bg-blue-100 text-black' : 'bg-gray-100 text-gray-900'
          )}
        >
          <p className="text-xs font-semibold mb-1">{m.role.toUpperCase()}</p>
          <p className="text-sm">{m.content}</p>
        </div>
      ))}
    </div>
  )
}
