'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { buttonVariants } from './ui/button'

export function NewChatButton() {
  const router = useRouter()

  return (
    <button
      onClick={e => {
        e.preventDefault()
        const newId = Date.now().toString()
        router.push(`/chat/${newId}`)
      }}
      className={cn(
        buttonVariants({ size: 'sm', variant: 'outline' }),
        'flex gap-2'
      )}
    >
      ➕ New Chat
    </button>
  )
}
