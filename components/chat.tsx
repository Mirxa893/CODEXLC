'use client'

import { useEffect } from 'react'
import { useChat, type Message } from 'ai/react'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { useChatMessages } from '@/lib/hooks/use-chat-messages'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const chatId = id ?? 'default-chat'
  const { addMessage } = useChatMessages(chatId)

  // Try loading messages from localStorage
  const savedMessages =
    typeof window !== 'undefined' ? localStorage.getItem(chatId) : null
  const parsedMessages = savedMessages ? JSON.parse(savedMessages) : undefined

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
    initialMessages: initialMessages?.length ? initialMessages : parsedMessages,
    id: chatId,
    body: { id: chatId },
    onResponse(response) {
      if (response.status !== 200) {
        toast.error(response.statusText)
      }
    },
    onFinish(message) {
      const updatedMessages = [...messages, message]
      localStorage.setItem(chatId, JSON.stringify(updatedMessages))
    },
    onError(error) {
      toast.error(error.message)
    }
  })

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(chatId, JSON.stringify(messages))
    }
  }, [messages, chatId])

  return (
    <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
      {messages.length ? (
        <>
          <ChatList messages={messages} />
          <ChatScrollAnchor trackVisibility={isLoading} />
        </>
      ) : (
        <EmptyScreen setInput={setInput} />
      )}
      <ChatPanel
        id={chatId}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
