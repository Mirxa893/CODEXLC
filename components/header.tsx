'use client'

import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { NewChatButton } from './new-chat-button'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Optional: expose state to Sidebar if needed later
  if (typeof window !== 'undefined') {
    (window as any).toggleSidebar = () => setSidebarOpen(prev => !prev)
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl">
      {/* LEFT SECTION: Logo + Hamburger */}
      <div className="flex items-center space-x-2">
        {/* Hamburger: visible only on mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1">
          <span className="font-bold text-lg text-black dark:text-white">Codex</span>
        </Link>
      </div>

      {/* CENTER: New Chat */}
      <NewChatButton />

      {/* RIGHT: Theme + GitHub */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <a
          target="_blank"
          href="https://github.com/humanloop/chatbot-starter/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:inline">GitHub</span>
        </a>
      </div>
    </header>
  )
}
