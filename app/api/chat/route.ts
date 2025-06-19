import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

// ✅ Your Hugging Face Space endpoint
const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('📥 Incoming body:', body)

    const messages = body?.messages || []
    const lastMessage = messages.at(-1)?.content?.trim() || ''
    const history: [string, string][] = [] // Add memory later if needed

    if (!lastMessage) {
      return new Response(JSON.stringify({
        id: Date.now().toString(),
        role: 'assistant',
        content: '⚠️ Please enter a valid message.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000)

    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: lastMessage, history }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok || !res.body) {
      const errText = await res.text().catch(() => '')
      console.error(`❌ HF error ${res.status}:`, errText)

      return new Response(JSON.stringify({
        id: Date.now().toString(),
        role: 'assistant',
        content: `🤖 Error ${res.status}: Hugging Face Space failed.`
      }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await res.json().catch(() => ({}))
    const reply = data?.response || '⚠️ No valid response received.'

    return new Response(JSON.stringify({
      id: Date.now().toString(),
      role: 'assistant',
      content: reply
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err: any) {
    console.error('❌ route.ts crash:', err.message || err)

    const isTimeout = err.name === 'AbortError'
    const message = isTimeout
      ? '⌛ Timeout: Hugging Face Space took too long to respond.'
      : `❌ Unexpected error: ${err.message || 'unknown'}`

    return new Response(JSON.stringify({
      id: Date.now().toString(),
      role: 'assistant',
      content: message
    }), {
      status: isTimeout ? 504 : 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
