import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(req: Request) {
  if (!OPENROUTER_API_KEY) {
    return new Response('Missing OpenRouter API key', { status: 401 })
  }

  let messages
  try {
    messages = (await req.json()).messages
  } catch (err) {
    return new Response('Invalid request payload', { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000) // ⏱️ 30s timeout safeguard

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://codexlc.vercel.app/',
        'X-Title': 'Codex By KAMRAN'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages,
        stream: true
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok || !response.body) {
      const errorText = await response.text()
      return new Response(`OpenRouter API failed: ${response.status} – ${errorText}`, {
        status: response.status
      })
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
