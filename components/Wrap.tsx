export default function Wrap({ children, max = 1120, style = {} }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: max, margin: '0 auto', padding: '0 clamp(22px,4vw,44px)', ...style }}>
      {children}
    </div>
  )
}
