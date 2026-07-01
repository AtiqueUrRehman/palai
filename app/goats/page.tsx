'use client'

import { useState, useEffect } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabase-browser'
import GoatCard from '@/components/GoatCard'
import SectionHeading from '@/components/SectionHeading'
import Wrap from '@/components/Wrap'
import type { Goat } from '@/types/database'

export default function BrowsePage() {
  const [goats, setGoats] = useState<Goat[]>([])

  useEffect(() => {
    supabase.from('goats').select('*').order('reserved', { ascending: true }).order('created_at', { ascending: false })
      .then(({ data }) => setGoats(data ?? []))
  }, [])

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

      <section style={{ padding: '0 0 clamp(40px,6vw,64px)' }}>
        <Wrap>
          {goats.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--sub)', padding: '24px 0' }}>
              Loading…
            </p>
          ) : (
            <div className="grid md:[grid-template-columns:repeat(2,1fr)]" style={{ gap: 'clamp(13px,2vw,20px)' }}>
              {goats.map((g, i) => <GoatCard key={g.id} goat={g} idx={i} />)}
            </div>
          )}
        </Wrap>
      </section>
    </>
  )
}
