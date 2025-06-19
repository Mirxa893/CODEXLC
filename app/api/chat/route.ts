import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

// ✅ Your Hugging Face Space backend endpoint
const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userMessage = body?.message?.trim()
    const history = body?.history || []

    // ❗ Return error if message is missing
    if (!userMessage) {
      return new Response('⚠️ Please enter a valid message.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // ✅ Abort request if it takes too long (60s)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60000)

    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history: history
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    // ❗ Handle error responses
    if (!res.ok || !res.body) {
      const errText = await res.text().catch(() => '')
      console.error(`❌ HF error ${res.status}:`, errText)
      return new Response(
        `🤖 Error ${res.status}: Server issue or timeout. Please try again.`,
        {
          status: res.status,
          headers: { 'Content-Type': 'text/plain' }
        }
      )
    }

    // ✅ Parse backend response safely
    const data = await res.json().catch(() => ({}))
    const reply = data?.response || '⚠️ No valid response received.'

    return new Response(reply, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  } catch (err: any) {
    console.error('❌ route.ts crash:', err.message || err)

    const isTimeout = err.name === 'AbortError'
    const message = isTimeout
      ? '⌛ Request timed out (over 60s). Please try again.'
      : `❌ Unexpected error: ${err.message || 'unknown'}`

    return new Response(message, {
      status: isTimeout ? 504 : 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}
