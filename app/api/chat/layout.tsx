// app/chat/layout.tsx

import { Sidebar } from '@/components/sidebar'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-muted/50">
        {children}
      </main>
    </div>
  )
}
