import { Sparkles } from "lucide-react"
import { GoogleButton } from "./google-button"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent),transparent_70%)]"
      />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Powered by Groq &amp; Llama 3.1
        </div>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Let AI handle your inbox
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          MailMind AI reads customer emails and writes perfect replies using your business profile. Connect your Gmail,
          answer FAQs automatically, and never miss a customer again.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <GoogleButton size="lg" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">$5 Lifetime Access</span> · No subscription · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
