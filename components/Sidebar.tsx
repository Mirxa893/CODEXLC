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
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-gradient-to-r from-[#2d2d2d] to-[#1c1c1c] text-white pt-16 p-4
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <Link
          href="/chat/new"
          onClick={closeSidebar}
          className="block mb-6 px-4 py-3 rounded-lg text-center font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transform transition-all duration-300 ease-in-out shadow-xl"
        >
          ➕ New Chat
        </Link>

        <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-6">
          All Chats
        </h2>
        <nav className="space-y-4">
          {chats.length === 0 ? (
            <p className="text-sm text-gray-400">No chats yet</p>
          ) : (
            chats.map(chat => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                onClick={closeSidebar}
                className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 hover:text-yellow-400 transform transition-all duration-200 ease-in-out"
              >
                {chat.title}
              </Link>
            ))
          )}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[9990] md:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
