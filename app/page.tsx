'use client'

import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid/non-secure'
import { Chat } from '@/components/chat'

export default function Page() {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    // ✅ Generate unique ID on the client only
    const newId = nanoid()
    setId(newId)
  }, [])

  if (!id) {
    return <div className="p-4 text-center text-lg">Loading chat...</div>
  }

  // Ensure that the Chat component is only rendered once the ID is set
  return (
    <div>
      {/* You can add more conditional rendering or state checks if necessary */}
      <Chat id={id} />
    </div>
  )
}
