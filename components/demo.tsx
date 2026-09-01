"use client"

import { useState } from "react"
import { Loader2, Sparkles, Mail } from "lucide-react"

const SAMPLE_EMAIL = `Hi, I saw your website and I'm interested in your services. Can you tell me:
1. What are your business hours?
2. How much do you charge for a consultation?
3. Do you offer weekend appointments?

Thanks!
Sarah`

const SAMPLE_PROFILE = `Business: Bright Smile Dental Clinic
Address: 123 Main Street, Springfield, IL 62704
Phone: (555) 123-4567
Hours: Mon-Fri 9am-5pm, Sat 10am-2pm, Sun Closed
Pricing: New patient consultation $75, Cleaning $120, Whitening $300
FAQs:
Q: Do you accept insurance? A: Yes, we accept most major insurance plans.
Q: Do you offer payment plans? A: Yes, we offer flexible monthly payment plans.`

export function Demo() {
  const [email, setEmail] = useState(SAMPLE_EMAIL)
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function generate() {
    setLoading(true)
    setError("")
    setReply("")
    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to generate reply")
      setReply(data.reply)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">See it in action</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Try the AI email responder right now — no signup needed.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-semibold leading-none">Try the AI Email Responder</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Paste an email below — see how MailMind replies using sample business info.
            </p>
          </div>
        </div>

        <label htmlFor="incoming-email" className="text-xs font-medium text-muted-foreground">
          Incoming Email
        </label>
        <textarea
          id="incoming-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rows={7}
          className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-3 text-sm leading-relaxed outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
        />

        <button
          type="button"
          onClick={generate}
          disabled={loading}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Generate AI Reply
            </>
          )}
        </button>

        {error && (
          <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {reply && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium text-muted-foreground">AI-generated reply</p>
            <div className="whitespace-pre-wrap rounded-lg border border-primary/20 bg-accent/50 p-4 text-sm leading-relaxed text-foreground">
              {reply}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Sample business profile used:</p>
          <pre className="overflow-x-auto rounded-lg bg-secondary p-4 font-mono text-xs leading-relaxed text-secondary-foreground">
            {SAMPLE_PROFILE}
          </pre>
        </div>
      </div>
    </section>
  )
}
