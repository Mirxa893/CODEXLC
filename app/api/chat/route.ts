import { StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(req: Request) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set')
  }

  const { messages } = await req.json()

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://codexlc.vercel.app/', // ✅ Your Vercel domain
      'X-Title': 'Codex By KAMRAN' // ✅ App title
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages,
      stream: true
    })
  })

  // Handle possible error response (optional safety)
  if (!response.ok || !response.body) {
    throw new Error(`OpenRouter API error: ${response.statusText}`)
  }

  return new StreamingTextResponse(response.body)
}
