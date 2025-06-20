'use client'

import Link from 'next/link'
import { useSidebar } from './sidebar-context'

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar()

  return (
    <>
      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-64 bg-gray-900 text-white p-4 pt-20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-xl font-bold mb-4 text-white">All Chats</h2>
        <nav className="space-y-2">
          <Link
            href="/chat/1"
            className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
            onClick={closeSidebar}
          >
            Chat 1
          </Link>
        </nav>
      </aside>

      {/* Mobile Backdrop */}
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
