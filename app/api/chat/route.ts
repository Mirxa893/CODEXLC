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
      'HTTP-Referer': 'https://logiqcurve.com/', // required for OpenRouter compliance
      'X-Title': 'Codex By KAMRAN'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo', // or other supported model
      messages: messages,
      stream: true
    })
  })

  return new StreamingTextResponse(response.body!)
}
