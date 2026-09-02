import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventName = req.headers.get('x-event-name');

    // Handle events like order_created, subscription_created, etc.
    console.log('Lemon Squeezy Event:', eventName, body);

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
      }
