'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [chats, setChats] = useState<{ id: string; title: string }[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // ✅ Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chat-history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setChats(parsed)
      } catch {
        localStorage.removeItem('chat-history')
      }
    }
  }, [])

  // ✅ Save chat history on change
  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(chats))
  }, [chats])

  const handleNewChat = () => {
    const newId = Date.now().toString()
    const newChat = { id: newId, title: 'New Chat' }
    const updated = [newChat, ...chats]
    setChats(updated)
    router.push(`/chat/${newId}`)
  }

  return (
    <div className="relative">
      <div className="md:hidden p-2">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          'fixed md:static z-50 h-full w-64 border-r bg-background p-4 transition-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <h2 className="text-lg font-bold mb-4">💬 Chats</h2>
        <Button onClick={handleNewChat} className="w-full mb-4">
          ➕ New Chat
        </Button>
        <div className="space-y-2 overflow-y-auto">
          {chats.length ? (
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  'block w-full rounded p-2 hover:bg-muted',
                  pathname === `/chat/${chat.id}` && 'bg-muted font-semibold'
                )}
              >
                {chat.title || `Chat ${chat.id.slice(-4)}`}
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No chats yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
