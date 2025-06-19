// app/api/chat/route.ts

import { NextRequest } from 'next/server'

const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: NextRequest) {
  // ✅ Parse incoming request body
  const body = await req.json()
  const userMessage = body.message?.trim()
  const history = body.history || []

  if (!userMessage) {
    return new Response('⚠️ Message is required', { status: 400 })
  }

  try {
    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history: history
      })
    })

    const data = await res.json()
    const reply = data.response || JSON.stringify(data)

    return new Response(reply, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (err: any) {
    return new Response(`❌ Error: ${err.message}`, { status: 500 })
  }
}
