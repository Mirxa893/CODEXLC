'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { NewChatButton } from './new-chat-button'
import { ThemeToggle } from './theme-toggle'
import { useSidebar } from './sidebar-context' // ✅ Import context

export function Header() {
  const { toggleSidebar } = useSidebar() // ✅ Access toggle from context

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl">
      {/* Left section: Hamburger + Logo */}
      <div className="flex items-center space-x-2">
        {/* Hamburger: mobile only */}
        <button
          onClick={toggleSidebar}
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

      {/* Center: New chat button */}
      <NewChatButton />

      {/* Right section */}
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
