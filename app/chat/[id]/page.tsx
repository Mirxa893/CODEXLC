import { Chat } from '@/components/chat'

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />
}
