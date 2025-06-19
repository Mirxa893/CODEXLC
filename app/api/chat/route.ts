import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userMessage = body?.message?.trim()
    const history = body?.history || []

    if (!userMessage) {
      return new Response('⚠️ Message is required', { status: 400 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 29000)

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

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`❌ HF Error ${res.status}:`, errorText)
      return new Response(`Error ${res.status}: ${errorText}`, { status: res.status })
    }

    const data = await res.json()
    const reply = data?.response || '⚠️ No response returned.'

    return new Response(reply, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (err: any) {
    console.error('❌ route.ts error:', err.message || err)
    return new Response(`❌ Route Error: ${err.message || 'Unknown'}`, {
      status: 500
    })
  }
}
