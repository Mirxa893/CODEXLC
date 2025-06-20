'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'

export default function NewChatPage() {
  const router = useRouter()

  useEffect(() => {
    const newId = uuid()
    router.replace(`/chat/${newId}`)
  }, [router])

  return null
}
