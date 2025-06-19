import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar' // ✅ Import your sidebar

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            {/* Main layout with sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - hidden on mobile, toggleable */}
              <aside className="hidden md:block w-64 border-r bg-background">
                <Sidebar />
              </aside>

              {/* Mobile Sidebar Toggle Button */}
              <div className="md:hidden absolute top-16 left-0 z-50">
                <Sidebar />
              </div>

              {/* Main content */}
              <main className="flex-1 overflow-y-auto p-4 bg-muted/50">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
