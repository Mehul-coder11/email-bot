'use client'

import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { useState } from 'react'

function GoogleIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
}

export function GoogleButton({ size = 'default', className }: { size?: 'default' | 'sm' | 'lg'; className?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function signIn() {
    setLoading(true)
    setError('')
    const { error: authError } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    })
    if (authError) {
      setError(authError.message.includes('provider is not enabled') ? 'Google sign-in is not enabled in Supabase yet.' : 'Google sign-in could not start. Please try again.')
      setLoading(false)
    }
  }

  return <div className="flex flex-col items-center gap-2"><button type="button" onClick={signIn} disabled={loading} aria-busy={loading} className={cn('inline-flex items-center justify-center gap-2.5 rounded-lg border border-border bg-card font-medium text-card-foreground shadow-sm transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0 disabled:cursor-wait disabled:opacity-60', size === 'sm' && 'px-3.5 py-2 text-sm', size === 'default' && 'px-5 py-2.5 text-sm', size === 'lg' && 'px-6 py-3.5 text-base', className)}><GoogleIcon className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />{loading ? 'Opening Google…' : 'Sign in with Google'}</button>{error && <p role="alert" className="max-w-xs text-center text-xs text-destructive">{error}</p>}</div>
}
