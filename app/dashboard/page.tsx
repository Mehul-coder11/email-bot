'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

const empty = { business_name: '', description: '', address: '', phone: '', website: '', hours: '', holidays: '', pricing: '', faqs: '', tone: 'Warm, professional, and concise' }
type Profile = typeof empty

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile>(empty)
  const [email, setEmail] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [reply, setReply] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email || '')
      const [{ data: business }, { data: access }] = await Promise.all([
        supabase.from('business_profiles').select('business_name,description,address,phone,website,hours,holidays,pricing,faqs,tone').eq('user_id', user.id).maybeSingle(),
        supabase.from('profiles').select('paid').eq('id', user.id).maybeSingle(),
      ])
      if (business) setProfile(business)
      setPaid(Boolean(access?.paid))
    }
    load()
  }, [])

  function update(key: keyof Profile, value: string) { setProfile((current) => ({ ...current, [key]: value })) }

  async function save() {
    setSaving(true); setMessage('')
    const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase.from('business_profiles').upsert({ ...profile, user_id: user.id, updated_at: new Date().toISOString() })
      setMessage(error ? 'Could not save your profile.' : 'Business profile saved.')
    }
    setSaving(false)
  }

  async function generate() {
    if (!testEmail.trim()) return
    setLoading(true); setReply('')
    const response = await fetch('/api/generate-reply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: testEmail, business: profile }) })
    const data = await response.json(); setReply(data.reply || data.error || 'No reply generated.'); setLoading(false)
  }

  async function buyAccess() { window.location.href = '/api/checkout' }
  async function logout() { await createClient().auth.signOut(); window.location.href = '/' }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><a href="/" className="font-semibold text-primary">MailMind AI</a><div className="flex items-center gap-4"><span className="hidden text-sm text-muted-foreground sm:block">{email}</span><button onClick={logout} className="text-sm font-medium text-muted-foreground hover:text-foreground">Sign out</button></div></div></header>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-primary">Business workspace</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Train your email assistant</h1><p className="mt-3 max-w-2xl leading-6 text-muted-foreground">Your profile is private to this Google account. MailMind uses it to write replies that sound like your business.</p></div><div className={`rounded-full px-3 py-1.5 text-sm font-medium ${paid ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>{paid ? 'Lifetime access active' : 'Free test mode'}</div></div>
        {!paid && <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-primary/20 bg-accent/50 p-5 sm:flex-row sm:items-center"><div><p className="font-semibold">Unlock automatic replies</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Get lifetime access for $5. Connect Gmail and let MailMind respond when new messages arrive.</p></div><button onClick={buyAccess} className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Get lifetime access</button></div>}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-2xl border bg-card p-6 shadow-sm"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-semibold">Business profile</h2><button onClick={save} disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{saving ? 'Saving…' : 'Save profile'}</button></div><div className="grid gap-4 sm:grid-cols-2">{([['business_name','Business name'],['address','Location / address'],['phone','Phone'],['website','Website'],['hours','Opening hours'],['holidays','Holidays'],['pricing','Pricing'],['tone','Reply tone']] as const).map(([key, label]) => <label key={key} className="grid gap-2 text-sm font-medium">{label}<input value={profile[key]} onChange={(event) => update(key, event.target.value)} className="rounded-lg border bg-background px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-primary" /></label>)}<label className="grid gap-2 text-sm font-medium sm:col-span-2">What does your business do?<textarea value={profile.description} onChange={(event) => update('description', event.target.value)} rows={3} className="resize-y rounded-lg border bg-background px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-primary" /></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">FAQs and policies<textarea value={profile.faqs} onChange={(event) => update('faqs', event.target.value)} rows={4} placeholder="Common questions, refund policy, booking instructions…" className="resize-y rounded-lg border bg-background px-3 py-2 font-normal outline-none focus:ring-2 focus:ring-primary" /></label></div>{message && <p className="mt-4 text-sm text-primary">{message}</p>}</section>
          <section className="h-fit rounded-2xl border bg-card p-6 shadow-sm"><p className="text-sm font-medium text-primary">Try it first</p><h2 className="mt-2 text-xl font-semibold">Generate a test reply</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">See how MailMind responds using your business details. Your API key stays server-side.</p><textarea value={testEmail} onChange={(event) => setTestEmail(event.target.value)} rows={7} placeholder="Paste a customer email here…" className="mt-5 w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-primary" /><button onClick={generate} disabled={loading || !testEmail.trim()} className="mt-3 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50">{loading ? 'Writing reply…' : 'Generate AI reply'}</button>{reply && <div className="mt-5 rounded-lg border bg-accent/40 p-4"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggested reply</p><p className="whitespace-pre-wrap text-sm leading-6">{reply}</p></div>}<div className="mt-8 border-t pt-6"><h3 className="font-semibold">Gmail connection</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Connect Gmail to automatically reply when a new customer email arrives. Google will show its required permission screen.</p><button disabled className="mt-4 w-full rounded-lg border px-4 py-2.5 text-sm font-medium text-muted-foreground">Connect Gmail — setup required</button></div></section>
        </div>
      </div>
    </main>
  )
}
