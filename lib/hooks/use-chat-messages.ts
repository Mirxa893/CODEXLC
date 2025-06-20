'use client'

import { useEffect, useState } from 'react'

export interface Chat {
  id: string
  title: string
}

export interface LocalMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export function useChatMessages(chatId: string) {
  const [messages, setMessages] = useState<LocalMessage[]>([])
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
  }, [])

  const saveMessages = (msgs: LocalMessage[]) => {
    setMessages(msgs)
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(msgs))
  }

  const addMessage = (msg: Omit<LocalMessage, 'id' | 'createdAt'>) => {
    const newMsg: LocalMessage = {
      ...msg,
      id: Date.now().toString(),
      createdAt: Date.now()
    }
    const updated = [...messages, newMsg]
    saveMessages(updated)

    const exists = chats.find(c => c.id === chatId)
    if (!exists && msg.role === 'user') {
      const newChat: Chat = {
        id: chatId,
        title: msg.content.slice(0, 30) || `Chat ${chats.length + 1}`
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
