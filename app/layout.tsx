import '@/app/globals.css'
import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/Sidebar'
import { SidebarProvider } from '@/components/sidebar-context'

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
          <SidebarProvider>
            <div className="min-h-screen flex flex-col">
              <Header /> {/* ✅ Full-width header at top */}
              <div className="flex flex-1 flex-row">
                <Sidebar />
                <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
