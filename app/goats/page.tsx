'use client'

import { useState, useEffect } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabase-browser'
import GoatCard from '@/components/GoatCard'
import SectionHeading from '@/components/SectionHeading'
import Wrap from '@/components/Wrap'
import type { Goat } from '@/types/database'

type Sort = 'default' | 'price_asc' | 'price_desc'

export default function BrowsePage() {
  const [goats, setGoats] = useState<Goat[]>([])
  const [sort, setSort] = useState<Sort>('default')

  useEffect(() => {
    supabase.from('goats').select('*').order('reserved', { ascending: true }).order('created_at', { ascending: false })
      .then(({ data }) => setGoats(data ?? []))
  }, [])

  const available = goats.filter(g => !g.reserved).length

  const sorted = [...goats].sort((a, b) => {
    if (a.reserved !== b.reserved) return a.reserved ? 1 : -1
    if (sort === 'price_asc') return (a.price ?? 0) - (b.price ?? 0)
    if (sort === 'price_desc') return (b.price ?? 0) - (a.price ?? 0)
    return 0
  })

  const options: { value: Sort; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ]

  return (
    <>
      <section style={{ padding: 'clamp(26px,5vw,48px) 0 18px' }}>
        <Wrap>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <SectionHeading
              label={`${available} goat${available !== 1 ? 's' : ''} available`}
              title="Browse the herd"
              sub="Tap any goat to watch its video and reserve. Reserved animals are greyed out."
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--sub)', whiteSpace: 'nowrap' }}>Sort by</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as Sort)}
                style={{ padding: '8px 12px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--surface)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', outline: 'none', cursor: 'pointer' }}
              >
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </Wrap>
      </section>

      <section style={{ padding: '0 0 clamp(40px,6vw,64px)' }}>
        <Wrap>
          {goats.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--sub)', padding: '24px 0' }}>
              Loading…
            </p>
          ) : (
            <div className="grid md:[grid-template-columns:repeat(2,1fr)]" style={{ gap: 'clamp(13px,2vw,20px)' }}>
              {sorted.map((g, i) => <GoatCard key={g.id} goat={g} idx={i} />)}
            </div>
          )}
        </Wrap>
      </section>
    </>
  )
}
