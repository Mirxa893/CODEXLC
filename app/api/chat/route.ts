import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

// Load env variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_REFERER = process.env.OPENROUTER_REFERER || 'https://localhost'
const OPENROUTER_TITLE = process.env.OPENROUTER_TITLE || 'Codex by Kamran'

export async function POST(req: Request) {
  if (!OPENROUTER_API_KEY) {
    console.error('❌ Missing OPENROUTER_API_KEY')
    return new Response('Missing OpenRouter API key', { status: 401 })
  }

  let messages
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages)) {
      throw new Error('Invalid messages format')
    }
  } catch (err: any) {
    console.error('❌ Invalid request body:', err.message)
    return new Response('Invalid request payload', { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': OPENROUTER_REFERER,
        'X-Title': OPENROUTER_TITLE
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free', // Try `openchat/openchat-3.5-1210:free` if needed
        messages,
        stream: true
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok || !response.body) {
      const errorText = await response.text()
      console.error(`❌ OpenRouter API failed: ${response.status}`, errorText)
      return new Response(`OpenRouter API error: ${response.status}`, { status: response.status })
    }

    return new StreamingTextResponse(response.body)
  } catch (err: any) {
    clearTimeout(timeout)
    console.error('❌ Request failed:', err.message)

    if (err.name === 'AbortError') {
      return new Response('Request to OpenRouter timed out', { status: 504 })
    }

    return new Response(`Unexpected error: ${err.message}`, { status: 500 })
  }
}
