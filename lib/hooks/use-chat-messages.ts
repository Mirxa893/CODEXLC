'use client'

import { useEffect, useState } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export function useChatMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(`chat-${chatId}`)
    if (stored) {
      setMessages(JSON.parse(stored))
    }
  }, [chatId])

  const saveMessages = (msgs: Message[]) => {
    setMessages(msgs)
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(msgs))
  }

  const addMessage = (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now().toString(),
      createdAt: Date.now()
    }
    const updated = [...messages, newMsg]
    saveMessages(updated)
  }

  const clearMessages = () => {
    localStorage.removeItem(`chat-${chatId}`)
    setMessages([])
  }

  return { messages, addMessage, clearMessages }
}
