import { headers } from 'next/headers'
import Link from 'next/link'
import { getFarm } from '@/lib/farms'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wrap from '@/components/Wrap'
import SectionHeading from '@/components/SectionHeading'
import Btn from '@/components/Btn'

const STATS = [
  { n: '1400+', l: 'Goats delivered till now' },
  { n: '100%', l: 'Customer satisfaction' },
  { n: '7 years', l: 'of successful journey' },
]

export default async function ResultsPage() {
  const h = await headers()
  const farm = getFarm(h.get('host') ?? '')

  const { data: videos } = await supabase
    .from('delivery_videos')
    .select('video_url')
    .eq('farm_slug', farm.slug)
    .order('created_at', { ascending: false })

  const list = (videos ?? []).filter(v => v.video_url)

  return (
    <>
      <Header farmName={farm.name} />
      <main>
        <section style={{ padding: 'clamp(26px,5vw,48px) 0 8px' }}>
          <Wrap>
            <SectionHeading label="Eid 2026 · Delivered" title="Last year, on camera" sub="Every goat below was reserved by video, raised on our farm, and delivered to the family before Eid. Here are their real handover clips." />
          </Wrap>
        </section>

        <section style={{ padding: 'clamp(20px,2.5vw,24px) 0 8px' }}>
          <Wrap>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(12px,2vw,20px)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 'clamp(20px,3vw,30px) clamp(18px,3vw,36px)', boxShadow: 'var(--shadow-sm)' }}>
              {STATS.map(s => (
                <div key={s.n} style={{ display: 'grid', gap: 5 }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,38px)', lineHeight: 1, color: 'var(--teal)', letterSpacing: '-0.02em' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'clamp(12px,1.3vw,14px)', lineHeight: 1.3, color: 'var(--sub)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {list.length > 0 && (
          <section style={{ padding: 'clamp(24px,4vw,36px) 0 8px' }}>
            <Wrap>
              <div className="grid md:[grid-template-columns:repeat(2,1fr)]" style={{ gap: 'clamp(12px,2vw,16px)' }}>
                {list.map((v, i) => (
                  <video
                    key={i}
                    src={v.video_url}
                    controls
                    playsInline
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block', background: '#000' }}
                  />
                ))}
              </div>
            </Wrap>
          </section>
        )}

        <section style={{ padding: 'clamp(26px,5vw,48px) 0 clamp(40px,7vw,72px)' }}>
          <Wrap>
            <div style={{ background: 'var(--teal)', borderRadius: 'var(--radius-lg)', padding: 'clamp(26px,4vw,48px) 22px', color: '#fff', display: 'grid', gap: 16, textAlign: 'center', justifyItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(22px,3vw,30px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Your goat could be next Eid&apos;s video
              </h2>
              <Link href="/goats"><Btn kind="gold" size="lg" icon>Reserve yours</Btn></Link>
            </div>
          </Wrap>
        </section>
      </main>
      <Footer farm={farm} />
    </>
  )
}
