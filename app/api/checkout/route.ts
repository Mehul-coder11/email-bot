import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.LEMON_SQUEEZY_CHECKOUT_URL
  if (!url) return NextResponse.json({ error: 'Payment checkout is not configured yet.' }, { status: 503 })
  return NextResponse.redirect(url)
}
