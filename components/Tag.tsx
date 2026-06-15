type TagProps = {
  children: React.ReactNode
  tone?: 'gold' | 'teal' | 'muted'
}

export default function Tag({ children, tone = 'gold' }: TagProps) {
  const styles: Record<string, React.CSSProperties> = {
    gold: { background: 'var(--gold-soft)', color: 'var(--gold)' },
    teal: { background: 'var(--teal-soft)', color: 'var(--teal)' },
    muted: { background: 'var(--alt)', color: 'var(--sub)' },
  }

  return (
    <span style={{
      ...styles[tone],
      borderRadius: 7, padding: '4px 9px',
      fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)',
      letterSpacing: '0.02em',
      display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}
