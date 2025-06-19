import { StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(req: Request) {
  const { messages } = await req.json()

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
    })
  })

  // 🔐 Do NOT await response.text() or do logging here in Edge runtime

  if (!response.ok || !response.body) {
    throw new Error(`OpenRouter API failed: ${response.status}`)
  }

  return new StreamingTextResponse(response.body)
}
