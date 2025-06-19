import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST(req: Request) {
  const body = await req.json()
  const userMessage = body.message?.trim() || ''
  const history: [string, string][] = body.history || []

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 29000)

  try {
    console.time('HF Space fetch')
    const res = await fetch(SPACE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history: history
      }),
      signal: controller.signal
    })
    console.timeEnd('HF Space fetch')
    clearTimeout(timeout)

    if (!res.ok || !res.body) {
      const err = await res.text()
      console.error(`❌ Hugging Face Space error ${res.status}:`, err)
      return new Response(`Error ${res.status}: ${err}`, { status: res.status })
    }

    const data = await res.json()
    console.log('📦 Response Data:', data)

    const reply = data.response || JSON.stringify(data)

    return new Response(reply, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (err: any) {
    clearTimeout(timeout)
    console.error('❌ Fetch error:', err)
    const status = err.name === 'AbortError' ? 504 : 500
    return new Response(err.message || 'Internal Server Error', { status })
  }
}
