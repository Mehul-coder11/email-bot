import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userText = body.prompt || body.email || body.message || body.text || '';

    if (!userText) {
      return NextResponse.json({ error: 'No prompt or email provided' }, { status: 400 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { 
            role: 'system', 
            content: 'You are an email assistant. Generate a clear, polite, and professional email response based on the input text provided.' 
          },
          { 
            role: 'user', 
            content: userText 
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      return NextResponse.json({ error: data.error?.message || 'Groq API request failed' }, { status: response.status });
    }

    const replyText = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ reply: replyText, text: replyText }, { status: 200 });
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
