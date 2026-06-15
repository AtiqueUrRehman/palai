'use client'

type ChipProps = {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function Chip({ children, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `1.5px solid ${active ? 'var(--teal)' : 'var(--line)'}`,
        cursor: 'pointer',
        background: active ? 'var(--teal)' : 'transparent',
        color: active ? '#fff' : 'var(--sub)',
        borderRadius: 999, padding: '8px 15px',
        fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap', transition: 'all .12s', letterSpacing: '-0.01em',
      }}
    >
      {children}
    </button>
  )
}
