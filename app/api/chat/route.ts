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
      'HTTP-Referer': 'https://codexlc.vercel.app/',
      'X-Title': 'Codex By KAMRAN'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages,
      stream: true
    })
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${errText}`)
  }

  // 🔐 Make sure response.body exists before using it
  if (!response.body) {
    throw new Error('OpenRouter returned no response body')
  }

  return new StreamingTextResponse(response.body)
}
