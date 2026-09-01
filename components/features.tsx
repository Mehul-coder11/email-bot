import { Zap, Clock, ShieldCheck, UserCog } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant AI Replies",
    body: "MailMind reads incoming emails and drafts context-aware replies in seconds — using your business profile as context.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    body: "Never leave a customer waiting. Your AI responder works around the clock, even when you are asleep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Gmail Integration",
    body: "Connect via Google OAuth with gmail.modify scope. We only access what we need to read and reply — nothing more.",
  },
  {
    icon: UserCog,
    title: "Custom Business Profile",
    body: "Set your hours, pricing, address, and FAQs. The AI uses this to answer questions accurately and on-brand.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Built for small businesses that want to respond faster.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
