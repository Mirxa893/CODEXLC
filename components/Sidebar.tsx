'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Hamburger Icon */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-[9999] h-full w-64 bg-gray-900 text-white p-4
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}>
        <h2 className="text-xl font-bold mb-4 text-red-500">SIDEBAR TEST</h2>
        <nav className="space-y-2">
          <Link href="/chat/1" className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700">Chat 1</Link>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9990] md:hidden" onClick={toggleSidebar} />
      )}
    </>
  )
}
