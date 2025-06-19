'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  // ✅ Load chats from local storage
  const [chats, setChats] = useLocalStorage<{ id: string; title: string }[]>('chat-history', [])

  const handleNewChat = () => {
    const newId = Date.now().toString()
    const newChat = { id: newId, title: 'New Chat' }
    const updatedChats = [newChat, ...chats]
    setChats(updatedChats) // ✅ Save to localStorage
    router.push(`/chat/${newId}`)
  }

  return (
    <div className="w-64 h-full border-r bg-background p-4">
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
  )
}
