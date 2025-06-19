import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

const API_KEY = process.env.OPENROUTER_API_KEY
const REFERER = process.env.OPENROUTER_REFERER || 'https://localhost'
const TITLE = process.env.OPENROUTER_TITLE || 'Codex by Kamran'

// ✅ Debug log to check if API key is loaded
console.log('🔑 API KEY CHECK:', API_KEY ? '✅ Loaded' : '❌ Missing')

export async function POST() {
  if (!API_KEY) return new Response('Missing API key', { status: 401 })

  const messages = [
    { role: 'user', content: 'Hello, who are you?' }
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 29000)

  try {
    console.time('OpenRouter fetch')
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
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
    console.timeEnd('OpenRouter fetch')
    clearTimeout(timeout)

    if (!res.ok || !res.body) {
      const err = await res.text()
      console.error(`❌ OpenRouter error ${res.status}:`, err)
      return new Response(`Error ${res.status}: ${err}`, { status: res.status })
    }

    return new StreamingTextResponse(res.body)

  } catch (err: any) {
    clearTimeout(timeout)
    console.error('❌ Fetch error:', err)

    const status = err.name === 'AbortError' ? 504 : 500
    return new Response(err.message, { status })
  }
}
