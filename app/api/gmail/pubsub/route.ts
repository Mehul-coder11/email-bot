import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  if (process.env.GOOGLE_PUBSUB_VERIFICATION_TOKEN && token !== process.env.GOOGLE_PUBSUB_VERIFICATION_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const envelope = await request.json().catch(() => null)
  const message = envelope?.message?.data
  if (!message) return NextResponse.json({ received: true })
  // Gmail push notifications contain a historyId and emailAddress. The message
  // handler will be added after Google Cloud Pub/Sub credentials are configured.
  return NextResponse.json({ received: true, historyId: message.historyId ?? null })
}

export async function GET() { return NextResponse.json({ ok: true, service: 'mailmind-gmail-events' }) }
