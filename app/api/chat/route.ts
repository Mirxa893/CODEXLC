import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST() {
  const userMessage = 'Hello, who are you?'

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 29000)

  try {
    console.time('HF Space fetch')
    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: userMessage }),
      signal: controller.signal
    })
    console.timeEnd('HF Space fetch')
    clearTimeout(timeout)

    if (!res.ok || !res.body) {
      const err = await res.text()
      console.error(`❌ Hugging Face Space error ${res.status}:`, err)
      return new Response(`Error ${res.status}: ${err}`, { status: res.status })
    }

    // If your space does not return a stream:
    const data = await res.json()
    return new Response(data.generated_text || data || 'No response', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

    // If your space *does* return a stream, use:
    // return new StreamingTextResponse(res.body)

  } catch (err: any) {
    clearTimeout(timeout)
    console.error('❌ Fetch error:', err)

    const status = err.name === 'AbortError' ? 504 : 500
    return new Response(err.message, { status })
  }
}
