'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { Menu } from 'lucide-react'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useLocalStorage<{ id: string; title: string }[]>('chat-history', [])

  const handleNewChat = () => {
    const newId = Date.now().toString()
    const newChat = { id: newId, title: 'New Chat' }
    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    setIsOpen(false) // close on mobile
    router.push(`/chat/${newId}`)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 border-r bg-background p-4 shadow transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:block'
        )}
      >
        <h2 className="text-lg font-bold mb-4">Chats</h2>
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
      </aside>
    </>
  )
}
