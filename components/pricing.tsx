import { Check } from "lucide-react"
import { GoogleButton } from "./google-button"

const perks = [
  "AI email auto-responder powered by Llama 3.1",
  "Gmail integration with gmail.modify scope",
  "Custom business profile (hours, pricing, FAQs)",
  "Unlimited AI-generated replies",
  "24/7 automated inbox monitoring",
]

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            One payment. Lifetime access. No subscriptions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Lifetime Access</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-tight">$5</span>
            <span className="pb-1 text-sm text-muted-foreground">one-time</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Pay once, use forever. No recurring fees.</p>

          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <GoogleButton size="lg" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
