import { createClient } from '@/lib/supabase/server'
import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { z } from 'zod'

const schema = z.object({ email: z.string().trim().min(5).max(12000), business: z.record(z.string(), z.string()).optional() })

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) return Response.json({ error: 'Please provide a customer email.' }, { status: 400 })
    if (!process.env.GROQ_API_KEY) return Response.json({ error: 'AI is not configured yet.' }, { status: 503 })
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Please sign in to generate a reply.' }, { status: 401 })
    const { data: profile } = await supabase.from('business_profiles').select('*').eq('user_id', user.id).maybeSingle()
    const business = profile ?? parsed.data.business ?? {}
    const context = Object.entries(business).filter(([key, value]) => key !== 'user_id' && value).map(([key, value]) => `${key}: ${value}`).join('\n') || 'No business profile provided.'
    const result = await generateText({
      model: groq(process.env.GROQ_MODEL || 'llama-3.1-8b-instant'),
      system: `You write helpful business email replies. Never invent facts, prices, policies, or promises. Use only this business profile:\n${context}\nKeep the reply concise, warm, and ready to send. Return only the email body, without a subject line or analysis.`,
      prompt: parsed.data.email,
      maxOutputTokens: 450,
      temperature: 0.4,
    })
    await supabase.from('reply_logs').insert({ user_id: user.id, subject: 'Test reply', customer_email: 'test@example.com', reply: result.text, status: 'test' })
    return Response.json({ reply: result.text })
  } catch (error) {
    console.error('[v0] reply generation failed', error)
    return Response.json({ error: 'Unable to generate a reply right now.' }, { status: 500 })
  }
}
