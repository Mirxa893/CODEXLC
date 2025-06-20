'use client'

import { useEffect, useState } from 'react'

export interface Chat {
  id: string
  title: string
}

export function useChatHistory() {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const storedChats = localStorage.getItem('chat-history')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }
  }, [])

  return { chats }
}
