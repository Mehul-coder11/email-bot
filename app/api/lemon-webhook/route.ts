import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventName = req.headers.get('x-event-name');

    // Log the Lemon Squeezy event data for debugging
    console.log('Lemon Squeezy Event Received:', eventName, body);

    // TODO: Add your custom payment handling logic here (e.g., updating user database)

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err) {
    console.error('Lemon webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
