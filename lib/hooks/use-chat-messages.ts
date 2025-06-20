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

  // Load chat messages
  useEffect(() => {
    const stored = localStorage.getItem(`chat-${chatId}`)
    if (stored) {
      setMessages(JSON.parse(stored))
    }
  }, [chatId])

  // Load chat history
  useEffect(() => {
    const storedChats = localStorage.getItem('chat-history')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }
  }, [])

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

    // Auto-save chat to history if not exists
    const exists = chats.find(c => c.id === chatId)
    if (!exists) {
      const newChat: Chat = {
        id: chatId,
        title: `Chat ${chats.length + 1}`
      }
      const updatedChats = [...chats, newChat]
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
