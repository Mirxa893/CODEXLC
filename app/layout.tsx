import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/Sidebar' // ✅ Now global

export const metadata = {
  title: {
    default: 'Codex Chatbot',
    template: '%s - Codex Chatbot'
  },
  description: 'An AI chatbot built with Next.js and OpenRouter.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable, fontMono.variable)}>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex md:flex-row">
            <Sidebar /> {/* ✅ Shown on all routes now */}
            <div className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 p-4 bg-muted/50">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
