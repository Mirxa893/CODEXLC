'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Sidebar({ chats = [] }: { chats?: { id: string; title: string }[] }) {
  const router = useRouter()

  const handleNewChat = () => {
    const newId = Date.now().toString()
    router.push(/chat/${newId})
  }

  return (
    <div className="w-64 h-full border-r bg-background p-4">
      <h2 className="text-lg font-bold mb-4">💬 Chats</h2>
      <Button onClick={handleNewChat} className="w-full mb-4">
        ➕ New Chat
      </Button>
      <div className="space-y-2 overflow-y-auto">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={/chat/${chat.id}}
            className="block w-full rounded p-2 hover:bg-muted"
          >
            {chat.title || Chat ${chat.id.slice(-4)}}
          </Link>
        ))}
      </div>
    </div>
  )
}
