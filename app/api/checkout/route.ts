import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))
  const url = process.env.LEMON_SQUEEZY_CHECKOUT_URL
  if (!url) return NextResponse.json({ error: 'Payment checkout is not configured yet.' }, { status: 503 })
  const checkout = new URL(url)
  checkout.searchParams.set('checkout[custom][user_id]', user.id)
  if (user.email) checkout.searchParams.set('checkout[email]', user.email)
  return NextResponse.redirect(checkout)
}
