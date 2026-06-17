import { Play } from 'lucide-react'

type Props = {
  src?: string | null
  ratio?: string
  dur?: string | null
  label?: string
  big?: boolean
  breedSeed?: number
}

const HUE = [168, 150, 38, 190, 130]

export default function VideoThumb({ src, ratio = '4 / 3', dur, label, big = false, breedSeed = 0 }: Props) {
  const hue = HUE[breedSeed % HUE.length]

  if (src) {
    return (
      <div style={{ position: 'relative', width: '100%', borderRadius: big ? 'var(--radius-lg)' : 'var(--radius)', overflow: 'hidden', background: '#000' }}>
        <video
          src={src}
          controls
          playsInline
          style={{ width: '100%', height: 'auto', maxHeight: big ? '80vh' : '60vh', display: 'block' }}
        />
        {dur && (
          <div style={{ position: 'absolute', right: 9, bottom: 9, padding: '3px 8px', borderRadius: 7, background: 'rgba(0,0,0,0.5)', fontSize: 11, fontFamily: 'ui-monospace, monospace', color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Play size={9} fill="#fff" color="#fff" /> {dur}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      borderRadius: big ? 'var(--radius-lg)' : 'var(--radius)', overflow: 'hidden',
      background: `linear-gradient(135deg, var(--teal-deep), var(--teal))`,
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.16, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.9) 0 1.5px, transparent 1.5px 13px)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 30% 20%, hsla(${hue},45%,55%,0.30), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: big ? 72 : 54, height: big ? 72 : 54, borderRadius: 999, background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)', border: '1.5px solid rgba(255,255,255,0.5)', display: 'grid', placeItems: 'center', paddingLeft: 3 }}>
          <Play size={big ? 28 : 20} fill="#fff" color="#fff" />
        </div>
      </div>
      {dur && (
        <div style={{ position: 'absolute', right: 9, bottom: 9, padding: '3px 8px', borderRadius: 7, background: 'rgba(0,0,0,0.45)', fontSize: 11, fontFamily: 'ui-monospace, monospace', color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Play size={9} fill="#fff" color="#fff" /> {dur}
        </div>
      )}
      {label && (
        <div style={{ position: 'absolute', left: 11, top: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.32)', fontSize: 10.5, fontFamily: 'ui-monospace, monospace', color: 'rgba(255,255,255,0.92)', letterSpacing: '0.02em' }}>
          {label}
        </div>
      )}
    </div>
  )
}
