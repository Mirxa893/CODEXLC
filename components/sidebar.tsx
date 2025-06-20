'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Icon (top-left) - visible on small screens */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white p-4 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <nav className="space-y-2">
          <Link href="/chat/1" className="block bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">Chat 1</Link>
          <Link href="/chat/2" className="block bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">Chat 2</Link>
        </nav>
      </div>

      {/* Backdrop on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}
