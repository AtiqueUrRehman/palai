'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Btn from '@/components/Btn'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32, justifyContent: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--teal)', display: 'grid', placeItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 19, color: 'var(--gold)' }}>M</span>
          </div>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 20, color: 'var(--ink)' }}>Admin</span>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)', padding: 28, boxShadow: 'var(--shadow-sm)', display: 'grid', gap: 18 }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 22, color: 'var(--ink)' }}>Sign in</h1>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#dc2626' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none' }}
            />
          </div>

          <Btn type="submit" kind="primary" size="lg" full disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Btn>
        </form>
      </div>
    </div>
  )
}
