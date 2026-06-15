export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-body)',
      color: 'var(--gold)', letterSpacing: '0.01em',
      display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
    }}>
      {children}
    </div>
  )
}
