'use client'

import { useEffect, useState } from 'react'

export interface Chat {
  id: string
  title: string
}

export function useChatHistory() {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('chat-history')
    if (stored) {
      setChats(JSON.parse(stored))
    }
  }, [])

  return { chats }
}
