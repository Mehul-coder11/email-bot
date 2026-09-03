import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().trim().min(5).max(12000), business: z.record(z.string(), z.string()).optional() })

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: 'Please provide a customer email.' }, { status: 400 })
    if (!process.env.GROQ_API_KEY) return NextResponse.json({ error: 'AI is not configured yet. Add GROQ_API_KEY to the project.' }, { status: 503 })
    const context = parsed.data.business ? Object.entries(parsed.data.business).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join('\n') : 'No business profile provided.'
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant', temperature: 0.4, messages: [{ role: 'system', content: `You write helpful business email replies. Never invent facts, prices, policies, or promises. Use only this business profile:\n${context}\nKeep the reply concise, warm, and ready to send. Do not include a subject line.` }, { role: 'user', content: parsed.data.email }] }) })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: 'The AI provider could not generate a reply.' }, { status: 502 })
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || 'No reply was generated.' })
  } catch { return NextResponse.json({ error: 'Unable to generate a reply right now.' }, { status: 500 }) }
}
