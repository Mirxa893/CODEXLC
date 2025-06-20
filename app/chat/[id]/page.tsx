// /app/chat/[id]/page.tsx

'use client'

import { useParams } from 'next/navigation'
import { Chat } from '@/components/chat'

export default function ChatPage() {
  const params = useParams()
  const chatId = Array.isArray(params.id) ? params.id[0] : params.id

  return <Chat id={chatId} />
}
