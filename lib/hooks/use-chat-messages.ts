'use client'

import { useEffect, useState } from 'react'

export interface Chat {
  id: string
  title: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export function useChatMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(`chat-${chatId}`)
    if (stored) {
      setMessages(JSON.parse(stored))
    }
  }, [chatId])

  useEffect(() => {
    const storedChats = localStorage.getItem('chat-history')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }
  }, [chatId])

  const addMessage = (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now().toString(),
      createdAt: Date.now()
    }
    const updated = [...messages, newMsg]
    setMessages(updated)
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(updated))

    const stored = localStorage.getItem('chat-history')
    const currentChats: Chat[] = stored ? JSON.parse(stored) : []
    const exists = currentChats.find(c => c.id === chatId)
    if (!exists) {
      const newChat: Chat = {
        id: chatId,
        title: msg.content.slice(0, 30) || `Chat ${currentChats.length + 1}`
      }
      const updatedChats = [...currentChats, newChat]
      setChats(updatedChats)
      localStorage.setItem('chat-history', JSON.stringify(updatedChats))
    }
  }

  const clearMessages = () => {
    localStorage.removeItem(`chat-${chatId}`)
    setMessages([])
  }

  return { messages, chats, addMessage, clearMessages }
}
