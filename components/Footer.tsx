import Link from 'next/link'
import { MessageCircle, MapPin } from 'lucide-react'
import type { FarmConfig } from '@/lib/farms'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/goats', label: 'Browse goats' },
  { href: '/results', label: 'Last year' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer({ farm }: { farm: FarmConfig }) {
  return (
    <footer style={{ background: 'var(--teal-deep)', color: '#fff', marginTop: 8 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(40px,5vw,52px) clamp(22px,4vw,44px) clamp(30px,4vw,36px)' }}>
        <div className="md:grid" style={{ gap: 40, gridTemplateColumns: '1.4fr 1fr 1fr' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 11, background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 17, color: 'var(--gold)' }}>M</span>
              </div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18 }}>{farm.name}</span>
            </div>
            <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', maxWidth: 320 }}>
              Family-run goat farm in {farm.location}. Reserve by video, we raise it with care, delivered to your door on Eid.
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Explore</div>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} style={{ display: 'block', textDecoration: 'none', padding: '5px 0', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.82)' }}>
                {n.label}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Contact</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <a href={`https://wa.me/${farm.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14 }}>
                <MessageCircle size={20} color="#25D366" /> {farm.whatsapp}
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                <MapPin size={18} color="rgba(255,255,255,0.7)" /> {farm.location}, Pakistan
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(22px,4vw,44px) 28px', fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
        © 2026 {farm.name}. All rights reserved.
      </div>
    </footer>
  )
}
