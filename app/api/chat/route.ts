import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const REFERER = process.env.OPENROUTER_REFERER || 'https://localhost'
const TITLE = process.env.OPENROUTER_TITLE || 'Codex by Kamran'

export async function POST(req: Request) {
  if (!OPENROUTER_API_KEY) {
    return new Response('Missing OpenRouter API key', { status: 401 })
  }

  const { messages } = await req.json()

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
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages,
        stream: true
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok || !response.body) {
      const errorText = await response.text()
      return new Response(`OpenRouter error ${response.status}: ${errorText}`, { status: response.status })
    }

    return new StreamingTextResponse(response.body)
  } catch (err: any) {
    clearTimeout(timeout)

    if (err.name === 'AbortError') {
      return new Response('Request timed out', { status: 504 })
    }

    return new Response(`Unexpected error: ${err.message}`, { status: 500 })
  }
}
