'use client'

import { ArrowRight } from 'lucide-react'

type BtnProps = {
  children: React.ReactNode
  kind?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  full?: boolean
  icon?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Btn({
  children, kind = 'primary', size = 'md', onClick, full, icon, type = 'button', disabled,
}: BtnProps) {
  const pad = size === 'lg' ? '16px 24px' : size === 'sm' ? '9px 15px' : '13px 20px'
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13.5 : 15
  const iconSize = size === 'sm' ? 15 : 18

  const base: React.CSSProperties = {
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--btn-radius)',
    fontSize: fs, fontWeight: 650, fontFamily: 'var(--font-body)',
    lineHeight: 1, letterSpacing: '-0.01em', padding: pad,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    width: full ? '100%' : undefined,
    transition: 'transform .12s, filter .12s',
    whiteSpace: 'nowrap', opacity: disabled ? 0.6 : 1,
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, background: 'var(--gold)', color: '#231a08', boxShadow: 'var(--shadow-sm)' },
    secondary: { ...base, background: 'var(--surface)', color: 'var(--ink)', border: '1.5px solid var(--line)' },
    ghost: { ...base, background: 'transparent', color: 'var(--teal)', padding: size === 'sm' ? '8px 6px' : '12px 6px' },
    gold: { ...base, background: 'var(--gold)', color: '#231a08', boxShadow: 'var(--shadow-sm)' },
  }

  const iconColor = kind === 'primary' || kind === 'gold' ? '#231a08' : 'var(--teal)'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles[kind]}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.filter = 'brightness(1.06)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.filter = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {children}
      {icon && <ArrowRight size={iconSize} color={iconColor} />}
    </button>
  )
}
