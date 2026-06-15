import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminDashboard() {
  const session = await auth()
  const farmSlug = (session?.user as { farmSlug: string })?.farmSlug ?? 'malik'

  const [{ count: total }, { count: reserved }, { count: available }] = await Promise.all([
    supabaseAdmin.from('goats').select('*', { count: 'exact', head: true }).eq('farm_slug', farmSlug),
    supabaseAdmin.from('goats').select('*', { count: 'exact', head: true }).eq('farm_slug', farmSlug).eq('reserved', true),
    supabaseAdmin.from('goats').select('*', { count: 'exact', head: true }).eq('farm_slug', farmSlug).eq('reserved', false),
  ])

  const stats = [
    { label: 'Total goats', value: total ?? 0, color: 'var(--ink)' },
    { label: 'Reserved', value: reserved ?? 0, color: 'var(--teal)' },
    { label: 'Available', value: available ?? 0, color: 'var(--gold)' },
  ]

  return (
    <div style={{ display: 'grid', gap: 28 }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>Dashboard</h1>
        <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--sub)' }}>Farm: {farmSlug}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '20px 22px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 36, lineHeight: 1, color: s.color }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--sub)', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <a href="/admin/goats/new" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 20px', borderRadius: 'var(--btn-radius)', background: 'var(--gold)', color: '#231a08', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 650, fontSize: 14 }}>
          + Add new goat
        </a>
        <a href="/admin/goats" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 20px', borderRadius: 'var(--btn-radius)', background: 'var(--surface)', border: '1.5px solid var(--line)', color: 'var(--ink)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14 }}>
          Manage goats
        </a>
      </div>
    </div>
  )
}
