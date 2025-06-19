import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export const metadata = {
  title: {
    default: 'Codex Chatbot',
    template: '%s - Codex Chatbot'
  },
  description: 'An AI chatbot built with Next.js and OpenRouter.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 bg-muted/50">
              <Sidebar />
              <main className="flex-1 p-4 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
