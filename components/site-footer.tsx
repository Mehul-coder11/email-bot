import { Sparkles } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold">MailMind AI</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MailMind AI. Powered by Groq &amp; Llama 3.1.
        </p>
      </div>
    </footer>
  )
}
