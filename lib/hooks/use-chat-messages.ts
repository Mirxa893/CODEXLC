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

  const saveChats = (updatedChats: Chat[]) => {
    setChats(updatedChats)
    localStorage.setItem('chat-history', JSON.stringify(updatedChats))
  }

  const addMessage = (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now().toString(),
      createdAt: Date.now()
    }

    const updatedMessages = [...messages, newMsg]
    saveMessages(updatedMessages)

    // ✅ Add chat to history if it doesn't exist
    const chatExists = chats.some(chat => chat.id === chatId)
    if (!chatExists) {
      const newChat: Chat = {
        id: chatId,
        title: msg.content.slice(0, 20) || `Chat ${chats.length + 1}` // first 20 chars
      }
      const updatedChats = [...chats, newChat]
      saveChats(updatedChats)
    }
  }

  const clearMessages = () => {
    localStorage.removeItem(`chat-${chatId}`)
    setMessages([])
  }

  return { messages, chats, addMessage, clearMessages }
}
