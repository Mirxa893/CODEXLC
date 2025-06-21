'use client'

import Link from 'next/link'
import { useSidebar } from './sidebar-context'
import { useEffect, useState } from 'react'

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()
  const [chats, setChats] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    const storedChats = localStorage.getItem('chat-history')
    if (storedChats) {
      setChats(JSON.parse(storedChats))
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem('chat-history')
      setChats(updated ? JSON.parse(updated) : [])
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-[#111111] text-white pt-8 p-4
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-semibold mb-6">All Chats</h2>
        <nav className="space-y-4">
          {chats.length === 0 ? (
            <p className="text-sm text-gray-400">No chats yet</p>
          ) : (
            chats.map(chat => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onClick={closeSidebar}
                className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 hover:text-[#00B0FF] transition-colors duration-300"
              >
                {chat.title}
              </Link>
            ))
          )}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[9990] md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
