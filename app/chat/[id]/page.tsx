'use client'

import { useParams } from 'next/navigation'
import { useChatMessages } from '@/lib/hooks/use-chat-messages'
import { useState } from 'react'

export default function ChatPage() {
  const params = useParams()
  const chatId = params?.id as string

  const { messages, addMessage } = useChatMessages(chatId)
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    addMessage({ role: 'user', content: input })
    setInput('')
  }

  return (
    <div className="p-4 space-y-4">
      <div className="rounded border p-4 bg-white dark:bg-black min-h-[300px]">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-semibold">{msg.role}:</span> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded text-black dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}
