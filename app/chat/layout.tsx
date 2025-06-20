import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Sidebar } from '@/components/Sidebar'

export const metadata = {
  title: {
    default: 'Codex Chatbot',
    template: '%s - Codex Chatbot'
  },
  description: 'An AI chatbot built with Next.js and OpenRouter.'
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 bg-muted/50">{children}</main>
    </div>
  )
}
