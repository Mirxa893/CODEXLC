'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from './sidebar-context'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { cn } from '@/lib/utils'

interface Chat {
  id: string
  title: string
}

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()
  const [chats, setChats] = useState<Chat[]>([])
  const pathname = usePathname()
  const router = useRouter()

  // Load chat history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('chat-history')
    if (stored) {
      setChats(JSON.parse(stored))
    }
  }, [pathname]) // Update when path changes

  const createNewChat = () => {
    const newId = uuidv4()
    const newChat: Chat = {
      id: newId,
      title: 'New Chat'
    }

    const updated = [...chats, newChat]
    setChats(updated)
    localStorage.setItem('chat-history', JSON.stringify(updated))

    // Redirect to new chat page
    router.push(`/chat/${newId}`)
    closeSidebar()
  }

  return (
    <>
      <aside
        className={cn(
          `fixed top-0 left-0 z-[9999] h-full w-64 bg-[#0c0c0c] text-white pt-16 p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`
        )}
      >
        <button
          onClick={createNewChat}
          className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          + New Chat
        </button>

        <h2 className="text-lg font-bold mb-4">All Chats</h2>
        <nav className="space-y-2 overflow-auto max-h-[70vh] pr-1">
          {chats.length === 0 ? (
            <p className="text-sm text-gray-400">No chats yet</p>
          ) : (
            chats.map(chat => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onClick={closeSidebar}
                className={cn(
                  'block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 truncate',
                  pathname === `/chat/${chat.id}` && 'bg-gray-700'
                )}
              >
                {chat.title}
              </Link>
            ))
          )}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9990] md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
