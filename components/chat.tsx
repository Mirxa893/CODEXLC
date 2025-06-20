'use client'

import { useChat, type Message } from 'ai/react'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

// ✅ your custom hook to store chat and chat-history
import { useChatMessages } from '@/lib/hooks/use-chat-messages'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const chatId = id ?? 'default-chat'

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput
  } = useChat({
    api: '/api/chat',
    initialMessages,
    id: chatId,
    body: { id: chatId },
    onResponse(response) {
      if (response.status !== 200) {
        toast.error(response.statusText)
      }
    }
  })

  // ✅ local storage for chat history
  const { addMessage } = useChatMessages(chatId)

  // ✅ When user sends a message, store it in localStorage
  const handleUserSend = async () => {
    if (!input.trim()) return

    // Save to localStorage
    addMessage({
      role: 'user',
      content: input
    })

    // Send to backend
    await append({
      role: 'user',
      content: input
    })

    setInput('')
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mx-auto w-full max-w-5xl px-4 pb-[200px] pt-4 md:pt-10">
        {messages.length ? (
          <>
            <ChatList chatId={chatId} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>

      <ChatPanel
        id={chatId}
        isLoading={isLoading}
        stop={stop}
        append={handleUserSend} // ✅ override to call localStorage too
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
