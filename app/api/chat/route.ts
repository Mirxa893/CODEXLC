import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('📥 Incoming body:', body)

    // ✅ Fix: Read from messages[]
    const messages = body?.messages || []
    const lastMessageObj = messages.at(-1)
    const userMessage = lastMessageObj?.content?.trim() || ''
    const history: [string, string][] = [] // You can later support full chat history if needed

    if (!userMessage) {
      return new Response(JSON.stringify({ response: '⚠️ Please enter a valid message.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000)

    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage, history }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok || !res.body) {
      const errText = await res.text().catch(() => '')
      console.error(`❌ HF error ${res.status}:`, errText)
      return new Response(
        JSON.stringify({ response: `🤖 Error ${res.status}: HF Space failed.` }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const data = await res.json().catch(() => ({}))
    const reply = data?.response || '⚠️ No valid response received.'

    return new Response(JSON.stringify({ response: reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err: any) {
    console.error('❌ route.ts crash:', err.message || err)
    const isTimeout = err.name === 'AbortError'
    const message = isTimeout
      ? '⌛ Timeout: Hugging Face Space took too long to respond.'
      : `❌ Unexpected error: ${err.message || 'unknown'}`

    return new Response(JSON.stringify({ response: message }), {
      status: isTimeout ? 504 : 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
