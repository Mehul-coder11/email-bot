import { GoogleButton } from "./google-button"

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Ready to automate your inbox?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
        Join the businesses using MailMind AI to respond to customers instantly.
      </p>
      <div className="mt-8 flex justify-center">
        <GoogleButton size="lg" />
      </div>
    </section>
  )
}
