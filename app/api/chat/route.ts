import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs' // Avoids Edge timeout (10s limit)

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const REFERER = process.env.OPENROUTER_REFERER || 'https://localhost'
const TITLE = process.env.OPENROUTER_TITLE || 'Codex by Kamran'

export async function POST() {
  // 🔐 Safety check
  if (!OPENROUTER_API_KEY) {
    console.error('❌ Missing OPENROUTER_API_KEY')
    return new Response('Missing API key', { status: 401 })
  }

  // 🧪 Hardcoded minimal test message
  const messages = [
    { role: 'user', content: 'Hello, who are you?' }
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 29000)

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': REFERER,
        'X-Title': TITLE
      },
      body: JSON.stringify({
        model: 'openchat/openchat-3.5-1210:free', // ⚡ Fast & reliable
        messages,
        stream: true
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok || !response.body) {
      const errorText = await response.text()
      console.error(`❌ OpenRouter error ${response.status}:`, errorText)
      return new Response(`OpenRouter error ${response.status}: ${errorText}`, {
        status: response.status
      })
    }

    return new StreamingTextResponse(response.body)
  } catch (err: any) {
    clearTimeout(timeout)

    if (err.name === 'AbortError') {
      console.error('❌ Request timed out')
      return new Response('Request timed out', { status: 504 })
    }

    console.error('❌ Unexpected error:', err)
    return new Response(`Unexpected error: ${err.message}`, { status: 500 })
  }
}
