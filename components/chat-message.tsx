'use client'

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'

export interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message, ...props }: ChatMessageProps) {
  const isUser = message.role === 'user'

  const isTyping =
    message.content.trim() === '▍' ||
    message.content.trim() === '' ||
    message.content.trim().endsWith('▍')

  return (
    <div
      className={cn(
        'group relative mb-4 flex w-full items-start',
        isUser ? 'justify-end' : 'justify-start'
      )}
      {...props}
    >
      {/* Left Avatar (assistant only) */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow bg-primary text-primary-foreground">
          <IconOpenAI />
        </div>
      )}

      {/* Message Content */}
      <div className="ml-4 flex max-w-[80%] flex-col space-y-2 overflow-hidden px-1">
        {isTyping ? (
          <div className="flex space-x-1 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.1s]" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
          </div>
        ) : (
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length && children[0] === '▍') {
                  return <span className="mt-1 animate-pulse cursor-default">▍</span>
                }

                const match = /language-(\w+)/.exec(className || '')
                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={match?.[1] || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
        )}

        <ChatMessageActions message={message} />
      </div>

      {/* Right Avatar (user only) */}
      {isUser && (
        <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow bg-background">
          <IconUser />
        </div>
      )}
    </div>
  )
}
