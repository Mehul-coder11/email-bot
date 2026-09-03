import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const raw = await request.text()
  const signature = request.headers.get('x-signature') || ''
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
  if (!secret || !signature) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const digest = createHmac('sha256', secret).update(raw).digest('hex')
  if (digest.length !== signature.length || !timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = JSON.parse(raw)
  const event = body.meta?.event_name
  const attrs = body.data?.attributes || {}
  const custom = body.meta?.custom_data || {}
  const email = custom.email || attrs.user_email || attrs.customer_email
  const userId = custom.user_id
  if (['order_created', 'subscription_created'].includes(event) && (email || userId)) {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const query = admin.from('profiles').update({ paid: true, lemon_order_id: String(body.data?.id || '') })
    if (userId) await query.eq('id', userId)
    else await query.eq('email', email)
  }
  return NextResponse.json({ received: true })
}
