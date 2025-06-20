import { useLocalStorage } from './use-local-storage'

export interface Chat {
  id: string
  title: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export function useChatMessages() {
  const [messages, setMessages] = useLocalStorage<Message[]>('chat-messages', [])
  const [chats, setChats] = useLocalStorage<Chat[]>('chat-history', [])

  const addMessage = (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMessage: Message = {
      ...msg,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, newMessage])
  }

  const clearMessages = () => setMessages([])

  return {
    messages,
    chats, // ✅ make sure this is returned
    addMessage,
    clearMessages,
  }
}
