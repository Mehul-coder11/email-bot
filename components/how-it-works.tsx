const steps = [
  {
    n: "01",
    title: "Sign in with Google",
    body: "Connect your Gmail account securely with a single click.",
  },
  {
    n: "02",
    title: "Set up your business profile",
    body: "Add your address, hours, pricing, and frequently asked questions.",
  },
  {
    n: "03",
    title: "Let AI handle your inbox",
    body: "MailMind responds to customer emails automatically using your business context.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">Three steps to an automated inbox.</p>
      </div>

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className="relative">
            <span className="font-mono text-sm font-semibold text-primary">{s.n}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
