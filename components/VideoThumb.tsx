import { Play } from 'lucide-react'

type Props = {
  src?: string | null
  ratio?: string
  dur?: string | null
  label?: string
  big?: boolean
  breedSeed?: number
  reserved?: boolean
}

const HUE = [168, 150, 38, 190, 130]

const LIB = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID

function parseBunny(url: string): { cdn: string; guid: string } | null {
  const m = url.match(/https:\/\/(vz-[^/]+\.b-cdn\.net)\/([^/]+)\//)
  return m ? { cdn: m[1], guid: m[2] } : null
}

export default function VideoThumb({ src, ratio = '4 / 3', dur, label, big = false, breedSeed = 0, reserved = false }: Props) {
  const hue = HUE[breedSeed % HUE.length]
  const filter = reserved ? 'grayscale(1) brightness(0.6)' : 'none'
  const radii = { borderRadius: big ? 'var(--radius-lg)' : 'var(--radius)' }

  const durBadge = dur && (
    <div style={{ position: 'absolute', right: 9, bottom: 9, padding: '3px 8px', borderRadius: 7, background: 'rgba(0,0,0,0.5)', fontSize: 11, fontFamily: 'ui-monospace, monospace', color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
      <Play size={9} fill="#fff" color="#fff" /> {dur}
    </div>
  )

  if (src) {
    const bunny = parseBunny(src)

    if (bunny && !big) {
      // Browse card: static thumbnail + play overlay (no video download)
      return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', filter, ...radii }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://${bunny.cdn}/${bunny.guid}/thumbnail.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: 999, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', border: '1.5px solid rgba(255,255,255,0.4)', display: 'grid', placeItems: 'center', paddingLeft: 3 }}>
              <Play size={20} fill="#fff" color="#fff" />
            </div>
          </div>
          {durBadge}
        </div>
      )
    }

    if (bunny && big) {
      // Detail page: native video tag — browser applies rotation metadata correctly
      return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', filter, ...radii, background: '#000' }}>
          <video
            src={src}
            controls
            playsInline
            style={{ width: '100%', height: 'auto', maxHeight: '80vh', display: 'block' }}
          />
          {durBadge}
        </div>
      )
    }

    if (big) {
      // Old R2 video — only show player on detail page
      return (
        <div style={{ position: 'relative', width: '100%', ...radii, overflow: 'hidden', background: '#000', filter }}>
          <video
            src={src}
            controls
            playsInline
            style={{ width: '100%', height: 'auto', maxHeight: '80vh', display: 'block' }}
          />
          {durBadge}
        </div>
      )
    }
    // R2 video on browse card: fall through to placeholder (avoid loading large file)
  }

  // Gradient placeholder
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      ...radii, overflow: 'hidden',
      background: `linear-gradient(135deg, var(--teal-deep), var(--teal))`,
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.16, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.9) 0 1.5px, transparent 1.5px 13px)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 30% 20%, hsla(${hue},45%,55%,0.30), transparent 60%)` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: big ? 72 : 54, height: big ? 72 : 54, borderRadius: 999, background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)', border: '1.5px solid rgba(255,255,255,0.5)', display: 'grid', placeItems: 'center', paddingLeft: 3 }}>
          <Play size={big ? 28 : 20} fill="#fff" color="#fff" />
        </div>
      </div>
      {durBadge}
      {label && (
        <div style={{ position: 'absolute', left: 11, top: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.32)', fontSize: 10.5, fontFamily: 'ui-monospace, monospace', color: 'rgba(255,255,255,0.92)', letterSpacing: '0.02em' }}>
          {label}
        </div>
      )}
    </div>
  )
}
