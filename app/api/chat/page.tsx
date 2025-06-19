// app/chat/page.tsx

'use client'

import { nanoid } from 'nanoid/non-secure'
import { Chat } from '@/components/chat'

export default function ChatPage() {
  const id = nanoid()
  return <Chat id={id} />
}
