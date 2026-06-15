import { headers } from 'next/headers'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { getFarm } from '@/lib/farms'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wrap from '@/components/Wrap'
import VideoThumb from '@/components/VideoThumb'
import SectionHeading from '@/components/SectionHeading'
import Tag from '@/components/Tag'
import Btn from '@/components/Btn'

const STATS = [
  { n: '640+', l: 'Goats delivered last Eid' },
  { n: '100%', l: 'Delivered before Eid namaz' },
  { n: '9 yrs', l: 'Raising on the same farm' },
]

export default async function ResultsPage() {
  const h = await headers()
  const farm = getFarm(h.get('host') ?? '')

  const { data: videos } = await supabase
    .from('delivery_videos')
    .select('*')
    .eq('farm_slug', farm.slug)
    .order('created_at', { ascending: false })

  const list = videos ?? []

  return (
    <>
      <Header farmName={farm.name} />
      <main>
        <section style={{ padding: 'clamp(26px,5vw,48px) 0 8px' }}>
          <Wrap>
            <SectionHeading label="Eid 2025 · Delivered" title="Last year, on camera" sub="Every goat below was reserved by video, raised on our farm, and delivered to the family on Eid morning. Here are their real handover clips." />
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

        <section style={{ padding: 'clamp(24px,4vw,36px) 0 8px' }}>
          <Wrap>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(18px,2.5vw,22px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 'clamp(16px,2vw,24px)' }}>Delivery videos</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'clamp(16px,3vw,28px)' }} className="md:[grid-template-columns:repeat(3,1fr)]">
              {list.length === 0
                ? [0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i}>
                    <VideoThumb ratio="16 / 10" dur="1:00" label={`LY-0${i + 1}.mp4`} big breedSeed={i} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Family · City</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12.5, color: 'var(--faint)', marginTop: 3 }}>Breed</div>
                      </div>
                      <Tag tone="teal"><Check size={13} color="var(--teal)" /> Delivered</Tag>
                    </div>
                  </div>
                ))
                : list.map((v, i) => (
                  <div key={v.id}>
                    <VideoThumb ratio="16 / 10" src={v.video_url} dur={v.dur} label={`${v.id}.mp4`} big breedSeed={i} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{v.title}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12.5, color: 'var(--faint)', marginTop: 3 }}>{v.breed}</div>
                      </div>
                      <Tag tone="teal"><Check size={13} color="var(--teal)" /> Delivered</Tag>
                    </div>
                  </div>
                ))
              }
            </div>
          </Wrap>
        </section>

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
