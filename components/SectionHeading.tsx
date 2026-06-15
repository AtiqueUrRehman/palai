import Label from './Label'

type Props = {
  label?: string
  title: string
  sub?: string
  center?: boolean
}

export default function SectionHeading({ label, title, sub, center }: Props) {
  return (
    <div style={{
      textAlign: center ? 'center' : 'left',
      display: 'grid', gap: 12,
      justifyItems: center ? 'center' : 'start',
    }}>
      {label && <Label>{label}</Label>}
      <h2 style={{
        margin: 0,
        fontFamily: 'var(--font-head)', fontWeight: 700,
        fontSize: 'clamp(26px, 3.5vw, 34px)',
        lineHeight: 1.08, letterSpacing: '-0.02em',
        color: 'var(--ink)',
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          margin: 0, maxWidth: 480,
          fontFamily: 'var(--font-body)', fontWeight: 400,
          fontSize: 'clamp(15px, 1.5vw, 16.5px)', lineHeight: 1.5,
          color: 'var(--sub)',
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}
