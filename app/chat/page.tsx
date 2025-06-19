import { nanoid } from 'nanoid/non-secure'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

export default function Page() {
  const id = nanoid()
  return <Chat id={id} />
}
