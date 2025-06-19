// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

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
        'group relative mb-4 flex w-full items-start',
        isUser ? 'justify-end' : 'justify-start'
      )}
      {...props}
    >
      {!isUser && (
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
            'bg-primary text-primary-foreground'
          )}
        >
          <IconOpenAI />
        </div>
      )}

      <div className="ml-4 flex max-w-[80%] flex-col space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length && children[0] === '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default">▍</span>
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

      {isUser && (
        <div
          className={cn(
            'ml-4 flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
            'bg-background'
          )}
        >
          <IconUser />
        </div>
      )}
    </div>
  )
}
