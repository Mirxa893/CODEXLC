'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Hamburger Icon - top left */}
      <div className="md:hidden p-4 absolute top-2 left-2 z-[10000]">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-gray-900 text-white p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-bold mb-4 text-white">All Chats</h2>
        <nav className="space-y-2">
          <Link href="/chat/1" className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700">
            Chat 1
          </Link>
        </nav>
      </aside>

      {/* Backdrop Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9990] md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  )
}
