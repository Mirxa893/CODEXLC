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

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'group relative mb-4 flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
      {...props}
    >
      {/* Icon left side for assistant */}
      {!isUser && (
        <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow bg-primary text-primary-foreground">
          <IconOpenAI />
        </div>
      )}

      {/* Chat bubble */}
      <div
        className={cn(
          'rounded-xl px-4 py-3 shadow-md prose dark:prose-invert break-words max-w-[80%]',
          isUser
            ? 'bg-primary text-white dark:bg-primary'
            : 'bg-muted text-foreground dark:bg-muted'
        )}
      >
        <MemoizedReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length && children[0] === '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default text-xl">▍</span>
                )
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
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>

      {/* Icon right side for user */}
      {isUser && (
        <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow bg-background">
          <IconUser />
        </div>
      )}
    </div>
  )
}
