import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const groq = createGroq({
  apiKey: 'YOUR_GROQ_API_KEY_HERE', // Replace with your actual gsk_... key from Groq
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventName = req.headers.get('x-event-name');

    // Handle incoming events or prompt requests
    console.log('Event received:', eventName, body);

    const promptText = body.prompt || body.message || 'Write a standard professional email reply.';

    // Generate AI response directly via Groq (bypassing Vercel AI Gateway)
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: promptText,
    });

    return NextResponse.json({ status: 'success', reply: text }, { status: 200 });
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json({ error: 'Webhook/generation handler failed' }, { status: 500 });
  }
}
