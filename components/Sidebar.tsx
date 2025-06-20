'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSidebar } from './sidebar-context'

interface Chat {
  id: string
  title: string
}

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    const storedChats = localStorage.getItem('chat-history')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }
  }, [])

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-[#0c0c0c] text-white pt-16 p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-lg font-bold mb-4">All Chats</h2>
        <nav className="space-y-2">
          {chats.length === 0 && (
            <p className="text-sm text-gray-400">No chats yet</p>
          )}
          {chats.map(chat => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              onClick={closeSidebar}
              className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
            >
              {chat.title}
            </Link>
          ))}
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
