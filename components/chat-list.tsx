'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ChatListProps {
  currentId?: string
  chatIds: string[]
}

export function ChatList({ chatIds, currentId }: ChatListProps) {
  const [titles, setTitles] = useState<Record<string, string>>({})

  useEffect(() => {
    const loadTitles = () => {
      const updated: Record<string, string> = {}
      chatIds.forEach((id) => {
        try {
          const raw = localStorage.getItem(id)
          const messages = raw ? JSON.parse(raw) : []
          const firstUserMsg = messages.find(
            (m: any) => m.role === 'user' && m.content
          )
          updated[id] =
            firstUserMsg?.content?.slice(0, 30) || 'Untitled Chat'
        } catch {
          updated[id] = 'Untitled Chat'
        }
      })
      setTitles(updated)
    }

    loadTitles()

    // Optionally: auto-refresh titles every few seconds
    const interval = setInterval(loadTitles, 3000)
    return () => clearInterval(interval)
  }, [chatIds])

  return (
    <ul className="space-y-1">
      {chatIds.map((id) => (
        <li key={id}>
          <Link
            href={`/chat/${id}`}
            className={cn(
              'block px-4 py-2 rounded hover:bg-muted transition',
              currentId === id ? 'bg-muted font-bold' : ''
            )}
          >
            {titles[id] || 'Loading...'}
          </Link>
        </li>
      ))}
    </ul>
  )
}
