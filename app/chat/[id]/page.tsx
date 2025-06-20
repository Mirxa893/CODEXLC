'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Chat } from '@/components/chat'

export default function ChatByIdPage() {
  const router = useRouter()
  const params = useParams()
  const chatId = Array.isArray(params?.id) ? params.id[0] : params?.id

  // Navigate using shallow routing to avoid full page reload
  useEffect(() => {
    if (chatId) {
      router.replace(`/chat/${chatId}`, { scroll: false })
    }
  }, [chatId, router])

  return <Chat id={chatId} />
}
