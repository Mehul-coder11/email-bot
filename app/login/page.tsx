'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  async function signIn() {
    setLoading(true); setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        queryParams: { prompt: 'select_account' },
      },
    })
    if (error) {
      setError(
        error.message.includes('provider is not enabled')
          ? 'Google sign-in is not enabled for this MailMind project yet. Enable Google under Supabase → Authentication → Providers, then try again.'
          : 'Google sign-in could not start. Please try again.',
      )
      setLoading(false)
    }
    else router.refresh()
  }
  return <main className="min-h-screen bg-background flex items-center justify-center px-6"><div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm"><a href="/" className="font-semibold text-primary">MailMind AI</a><h1 className="mt-10 text-3xl font-semibold tracking-tight">Welcome back</h1><p className="mt-2 leading-6 text-muted-foreground">Sign in with Google to manage your business profile and Gmail connection.</p><button onClick={signIn} disabled={loading} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-60">{loading ? 'Opening Google…' : 'Continue with Google'}</button>{error && <p className="mt-4 text-sm text-destructive">{error}</p>}<p className="mt-6 text-xs leading-5 text-muted-foreground">After signing in, connect Gmail separately so Google only requests email permissions when you enable the bot.</p></div></main>
}
