'use client'

import Link from 'next/link'
import { LayoutDashboard, List } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/goats', label: 'Goats', icon: List },
]

export default function AdminNav() {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
      {links.map(item => (
        <Link
          key={item.href}
          href={item.href}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: 'rgba(255,255,255,0.82)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <item.icon size={16} />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
