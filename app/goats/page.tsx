'use client'

import { useState, useEffect } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabase-browser'
import GoatCard from '@/components/GoatCard'
import SectionHeading from '@/components/SectionHeading'
import Chip from '@/components/Chip'
import Wrap from '@/components/Wrap'
import type { Goat } from '@/types/database'

const BREEDS = ['All', 'Beetal', 'Teddy', 'Makhi Cheeni', 'Barbari', 'Nachi', 'Kamori']

export default function BrowsePage() {
  const [goats, setGoats] = useState<Goat[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    supabase.from('goats').select('*').order('reserved', { ascending: true }).order('created_at', { ascending: false })
      .then(({ data }) => setGoats(data ?? []))
  }, [])

  const list = filter === 'All' ? goats : goats.filter(g => g.breed.startsWith(filter))
  const available = goats.filter(g => !g.reserved).length

  return (
    <>
      <section style={{ padding: 'clamp(26px,5vw,48px) 0 18px' }}>
        <Wrap>
          <SectionHeading
            label={`${available} goat${available !== 1 ? 's' : ''} available`}
            title="Browse the herd"
            sub="Tap any goat to watch its video and reserve. Reserved animals are greyed out."
          />
        </Wrap>
      </section>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
        <div style={{ display: 'flex', gap: 8, padding: '4px clamp(22px,4vw,44px) 18px', minWidth: 'max-content' }}>
          {BREEDS.map(b => (
            <Chip key={b} active={filter === b} onClick={() => setFilter(b)}>{b}</Chip>
          ))}
        </div>
      </div>

      <section style={{ padding: '0 0 clamp(40px,6vw,64px)' }}>
        <Wrap>
          {list.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--sub)', padding: '24px 0' }}>
              No goats found for this breed.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(13px,2vw,20px)' }} className="md:[grid-template-columns:repeat(4,1fr)]">
              {list.map((g, i) => <GoatCard key={g.id} goat={g} idx={i} />)}
            </div>
          )}
        </Wrap>
      </section>
    </>
  )
}
