'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Btn from './Btn'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/goats', label: 'Browse goats' },
  { href: '/results', label: 'Last year' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About' },
  { href: '/terms', label: 'Terms' },
]

export default function Header({ farmName }: { farmName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ background: 'rgba(244,238,225,0.86)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(12px, 1.5vw, 14px) clamp(18px, 4vw, 44px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 11, background: 'var(--teal)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 17, color: 'var(--gold)' }}>M</span>
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              {farmName}
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} style={{
                background: 'none', textDecoration: 'none',
                padding: '9px 13px', borderRadius: 999,
                fontFamily: 'var(--font-body)',
                fontWeight: pathname === n.href ? 700 : 550,
                fontSize: 14, color: pathname === n.href ? 'var(--teal)' : 'var(--sub)',
                letterSpacing: '-0.01em', whiteSpace: 'nowrap', transition: 'color .12s',
              }}>
                {n.label}
              </Link>
            ))}
            <div style={{ marginLeft: 10 }}>
              <Btn size="sm" kind="primary" onClick={() => window.location.href = '/goats'}>Reserve a goat</Btn>
            </div>
          </nav>

          {/* mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
            className="flex md:hidden items-center justify-center"
            style={{ width: 42, height: 42, borderRadius: 13, border: '1.5px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', flexShrink: 0 }}
          >
            {open ? <X size={22} color="var(--ink)" /> : <Menu size={22} color="var(--ink)" />}
          </button>
        </div>
      </div>

      {/* mobile slide-down */}
      <div
        className="md:hidden"
        style={{ overflow: 'hidden', transition: 'max-height .28s ease, opacity .2s', maxHeight: open ? 460 : 0, opacity: open ? 1 : 0, background: 'var(--surface)', borderBottom: open ? '1px solid var(--line)' : 'none', boxShadow: open ? 'var(--shadow)' : 'none' }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 12px 14px' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
              textDecoration: 'none', padding: '13px 14px', borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)', fontWeight: pathname === n.href ? 700 : 550, fontSize: 16,
              color: pathname === n.href ? 'var(--teal)' : 'var(--ink)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: pathname === n.href ? 'var(--teal-soft)' : 'transparent',
            }}>
              {n.label}
              {pathname === n.href && <ArrowRight size={16} color="var(--teal)" />}
            </Link>
          ))}
          <div style={{ padding: '10px 6px 2px' }}>
            <Btn full kind="primary" onClick={() => { setOpen(false); window.location.href = '/goats' }}>Reserve a goat</Btn>
          </div>
        </nav>
      </div>
    </header>
  )
}
