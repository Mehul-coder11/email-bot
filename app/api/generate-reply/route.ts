import { generateText } from "ai"

export const maxDuration = 30

const SAMPLE_PROFILE = `Business: Bright Smile Dental Clinic
Address: 123 Main Street, Springfield, IL 62704
Phone: (555) 123-4567
Hours: Mon-Fri 9am-5pm, Sat 10am-2pm, Sun Closed
Pricing: New patient consultation $75, Cleaning $120, Whitening $300
FAQs:
Q: Do you accept insurance? A: Yes, we accept most major insurance plans.
Q: Do you offer payment plans? A: Yes, we offer flexible monthly payment plans.`

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return Response.json({ error: "Please paste an email to respond to." }, { status: 400 })
    }

    const { text } = await generateText({
      model: "meta/llama-3.1-8b",
      system: `You are MailMind AI, an email assistant that writes replies on behalf of a business.
Use ONLY the following business profile as your source of truth. If the answer is not in the profile, say you'll follow up.
Write a warm, professional, concise reply. Do not invent facts. Sign off as "The Bright Smile Dental Clinic Team".

BUSINESS PROFILE:
${SAMPLE_PROFILE}`,
      prompt: `Write a reply to this incoming customer email:\n\n${email}`,
      temperature: 0.4,
    })

    return Response.json({ reply: text })
  } catch (err) {
    console.error("[v0] generate-reply error:", err)
    return Response.json({ error: "Something went wrong generating the reply. Please try again." }, { status: 500 })
  }
}
