import { StreamingTextResponse } from 'ai'

export const runtime = 'nodejs'

// 🔗 Replace with your Hugging Face Space endpoint
const SPACE_URL = 'https://mirxakamran893-LOGIQCURVECODE.hf.space/chat'

export async function POST() {
  // 💬 Hardcoded message for now; you can change this to read from request later
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

    // 🧠 Read and process the response JSON
    const data = await res.json()
    console.log('📦 Response Data:', data)

    // ✅ Handle different possible keys from Hugging Face Space
    let reply = ''

    if (typeof data === 'string') {
      reply = data
    } else if (data.generated_text) {
      reply = data.generated_text
    } else if (data.text) {
      reply = data.text
    } else if (data.output) {
      reply = data.output
    } else {
      reply = JSON.stringify(data)
    }

    return new Response(reply, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

    // 🔄 If your space supports streaming, you can instead use:
    // return new StreamingTextResponse(res.body)

  } catch (err: any) {
    clearTimeout(timeout)
    console.error('❌ Fetch error:', err)

    const status = err.name === 'AbortError' ? 504 : 500
    return new Response(err.message || 'Internal Server Error', { status })
  }
}
