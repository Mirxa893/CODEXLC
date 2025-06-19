import { nanoid } from 'nanoid/non-secure' // Safe for Edge runtime
import { Chat } from '@/components/chat'

export const runtime = 'edge'

export default function Page() {
  const id = nanoid()
  return <Chat id={id} />
}
