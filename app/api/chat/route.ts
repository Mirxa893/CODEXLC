import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs' // ✅ prevent Vercel Edge 504 timeout

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(req: Request) {
  const { messages } = await req.json()

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000) // Optional 30s safety net

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://codexlc.vercel.app/', // update this to your real domain
      'X-Title': 'Codex By KAMRAN'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324:free', // or try faster: openchat/openchat-3.5-1210:free
      messages,
      stream: true
    }),
    signal: controller.signal
  })

  clearTimeout(timeout)

  if (!response.ok || !response.body) {
    throw new Error(`OpenRouter API failed: ${response.status}`)
  }

  return new StreamingTextResponse(response.body)
}
