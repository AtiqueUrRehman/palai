import Link from 'next/link'
import { Scale, ArrowRight } from 'lucide-react'
import VideoThumb from './VideoThumb'
import Tag from './Tag'
import { fmt } from '@/lib/fmt'
import type { Goat } from '@/types/database'

export default function GoatCard({ goat, idx = 0 }: { goat: Goat; idx?: number }) {
  return (
    <Link href={`/goats/${goat.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)',
          cursor: goat.reserved ? 'default' : 'pointer',
          opacity: goat.reserved ? 0.62 : 1,
          transition: 'transform .14s, box-shadow .14s',
          display: 'flex', flexDirection: 'column', height: '100%',
        }}
        onMouseEnter={e => {
          if (!goat.reserved) {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = 'var(--shadow)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <VideoThumb ratio="4 / 3" src={goat.video_url} dur={goat.video_dur} label={goat.id} breedSeed={idx} />
          <div style={{ position: 'absolute', left: 11, bottom: 11, display: 'flex', gap: 6 }}>
            {goat.reserved
              ? <Tag tone="muted">Reserved</Tag>
              : goat.tag && <Tag tone="gold">{goat.tag}</Tag>}
          </div>
        </div>
        <div style={{ padding: '13px 14px 15px', display: 'grid', gap: 10, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 17, lineHeight: 1.1, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                {goat.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12.5, color: 'var(--faint)', marginTop: 2 }}>
                {goat.breed}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--sub)', whiteSpace: 'nowrap' }}>
              <Scale size={15} color="var(--gold)" /> {goat.weight_kg} kg
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--line-soft)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, lineHeight: 1, color: 'var(--ink)' }}>
                {fmt(goat.price)}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11.5, color: 'var(--faint)', marginTop: 3 }}>
                + {fmt(goat.care_fee)}/mo care
              </div>
            </div>
            {!goat.reserved && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-body)', color: 'var(--teal)' }}>
                View <ArrowRight size={15} color="var(--teal)" />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
