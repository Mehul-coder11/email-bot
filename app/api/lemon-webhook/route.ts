import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventName = req.headers.get('x-event-name');

    console.log('Event received:', eventName, body);

    const promptText = body.prompt || body.message || 'Write a standard professional email reply.';

    // Call Groq API directly (no extra packages required)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`, // Replace with your actual gsk_... key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: promptText }],
      }),
    });

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ status: 'success', reply: replyText }, { status: 200 });
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json({ error: 'Webhook/generation handler failed' }, { status: 500 });
  }
}
