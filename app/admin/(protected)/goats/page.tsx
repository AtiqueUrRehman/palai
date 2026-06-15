import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { fmt } from '@/lib/fmt'
import Link from 'next/link'

export default async function AdminGoatsPage() {
  const session = await auth()
  const farmSlug = (session?.user as { farmSlug: string })?.farmSlug ?? 'malik'

  const { data } = await supabaseAdmin
    .from('goats')
    .select('*')
    .eq('farm_slug', farmSlug)
    .order('created_at', { ascending: false })

  const list = (data ?? []) as import('@/types/database').Goat[]

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>Goats</h1>
        <Link href="/admin/goats/new" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 18px', borderRadius: 'var(--btn-radius)', background: 'var(--gold)', color: '#231a08', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 650, fontSize: 14 }}>
          + Add goat
        </Link>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        {list.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--sub)' }}>
            No goats yet. <Link href="/admin/goats/new" style={{ color: 'var(--teal)' }}>Add your first goat</Link>.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {['ID', 'Name', 'Breed', 'Weight', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((g, i) => (
                <tr key={g.id} style={{ borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                  <td style={{ padding: '13px 16px', fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--sub)' }}>{g.id}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{g.name}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--sub)' }}>{g.breed}</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--sub)', whiteSpace: 'nowrap' }}>{g.weight_kg} kg</td>
                  <td style={{ padding: '13px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{fmt(g.price)}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 7, fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)', background: g.reserved ? 'var(--alt)' : 'var(--teal-soft)', color: g.reserved ? 'var(--sub)' : 'var(--teal)' }}>
                      {g.reserved ? 'Reserved' : 'Available'}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <Link href={`/admin/goats/${g.id}/edit`} style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--teal)', textDecoration: 'none' }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}
