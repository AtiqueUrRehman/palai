import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { signOut } from '@/auth'
import { LogOut } from 'lucide-react'
import AdminNav from './AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>
      {/* sidebar */}
      <aside style={{ width: 220, flexShrink: 0, background: 'var(--teal-deep)', display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 32, paddingLeft: 4 }}>
          <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 15, color: 'var(--gold)' }}>M</span>
          </div>
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: '#fff' }}>Admin</span>
        </div>

        <AdminNav />

        <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
          <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.6)', width: '100%' }}>
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </aside>

      <main style={{ flex: 1, padding: 'clamp(24px,3vw,36px)', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
