'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, List, LogOut, Menu, X } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/goats', label: 'Goats', icon: List },
]

export default function AdminShell({
  children,
  signOutAction,
}: {
  children: React.ReactNode
  signOutAction: () => Promise<void>
}) {
  const [open, setOpen] = useState(false)

  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 30, height: 30, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 15, color: 'var(--gold)' }}>S</span>
      </div>
      <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Admin</span>
    </div>
  )

  const navLinks = (onClick?: () => void) => links.map(item => (
    <Link
      key={item.href}
      href={item.href}
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <item.icon size={17} />
      {item.label}
    </Link>
  ))

  const signOutBtn = (onClick?: () => void) => (
    <form action={signOutAction}>
      <button type="submit" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, color: 'rgba(255,255,255,0.55)', width: '100%' }}>
        <LogOut size={17} /> Sign out
      </button>
    </form>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Mobile top bar ── */}
      <div className="flex md:hidden" style={{ background: 'var(--teal-deep)', padding: '12px 16px', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
        {logo}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center justify-center"
          style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', cursor: 'pointer' }}
        >
          {open ? <X size={20} color="#fff" /> : <Menu size={20} color="#fff" />}
        </button>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div
        className="flex md:hidden"
        style={{ flexDirection: 'column', background: 'var(--teal-deep)', borderBottom: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', maxHeight: open ? 400 : 0, transition: 'max-height .25s ease', padding: open ? '8px 10px 14px' : '0 10px' }}
      >
        {navLinks(() => setOpen(false))}
        {signOutBtn(() => setOpen(false))}
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex" style={{ minHeight: '100vh' }}>
        <aside style={{ width: 220, flexShrink: 0, background: 'var(--teal-deep)', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'sticky', top: 0, height: '100vh' }}>
          <div style={{ marginBottom: 32, paddingLeft: 4 }}>{logo}</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {navLinks()}
          </nav>
          {signOutBtn()}
        </aside>

        <main style={{ flex: 1, padding: 'clamp(24px,3vw,36px)', overflow: 'auto' }}>
          {children}
        </main>
      </div>

      {/* ── Mobile content ── */}
      <div className="flex md:hidden" style={{ padding: '20px 16px 40px' }}>
        {children}
      </div>

    </div>
  )
}
