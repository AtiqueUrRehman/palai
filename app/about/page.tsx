import { headers } from 'next/headers'
import Link from 'next/link'
import { Leaf, Check, Video, MapPin, Star } from 'lucide-react'
import { getFarm } from '@/lib/farms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wrap from '@/components/Wrap'
import SectionHeading from '@/components/SectionHeading'
import Btn from '@/components/Btn'

const FEATURES = [
  { icon: Leaf, title: 'Raised on natural feed', desc: 'Green fodder, grams and clean water — no shortcuts, no harmful fattening agents.' },
  { icon: Check, title: 'Vaccinated & vet-checked', desc: 'Every animal is vaccinated and monitored by our on-call veterinarian.' },
  { icon: Video, title: 'You watch them grow', desc: 'Monthly video and weight updates so you always know how your goat is doing.' },
  { icon: MapPin, title: 'Visit us anytime', desc: 'You\'re welcome to come meet your goat in person before Eid, by appointment.' },
]

export default async function AboutPage() {
  const h = await headers()
  const farm = getFarm(h.get('host') ?? '')

  return (
    <>
      <Header farmName={farm.name} />
      <main>
        <section style={{ padding: 'clamp(26px,5vw,48px) 0 0' }}>
          <Wrap>
            <div className="md:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'center' }}>
              <SectionHeading
                label="About the farm"
                title="Nine Eids, one family farm"
                sub={`${farm.name} is a family-run goat farm in ${farm.location}. We've raised and delivered qurbani animals for Punjab families since 2017.`}
              />
              <div style={{ marginTop: 20 }} className="md:mt-0">
                <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 'var(--radius-lg)', background: 'var(--teal-soft)', display: 'grid', placeItems: 'center' }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--teal)', opacity: 0.7 }}>farm-wide-shot.jpg</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                  {['feeding.jpg', 'vet-checkup.jpg'].map(l => (
                    <div key={l} style={{ width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius)', background: 'var(--teal-soft)', display: 'grid', placeItems: 'center' }}>
                      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--teal)', opacity: 0.7 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Wrap>
        </section>

        <section style={{ padding: 'clamp(26px,5vw,56px) 0 0' }}>
          <Wrap>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'clamp(18px,2.5vw,28px)' }} className="md:[grid-template-columns:repeat(2,1fr)]">
              {FEATURES.map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 13 }}>
                  <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 15, background: 'var(--teal-soft)', display: 'grid', placeItems: 'center' }}>
                    <f.icon size={23} color="var(--teal)" />
                  </div>
                  <div style={{ display: 'grid', gap: 4 }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{f.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.45, color: 'var(--sub)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        <section style={{ padding: 'clamp(28px,5vw,56px) 0 clamp(40px,7vw,72px)' }}>
          <Wrap max={780}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 'clamp(22px,3vw,34px) clamp(20px,3vw,32px)', boxShadow: 'var(--shadow-sm)', display: 'grid', gap: 14, textAlign: 'center', justifyItems: 'center' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0, 1, 2, 3, 4].map(i => <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 500, fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.5, color: 'var(--ink)', letterSpacing: '-0.02em', maxWidth: 560 }}>
                &ldquo;Reserved a Beetal in March, got a video every month, and it reached us before Eid namaz. Healthy, exactly as shown. Doing it again this year.&rdquo;
              </p>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, color: 'var(--faint)' }}>— Imran Khan, Lahore</div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Link href="/goats"><Btn kind="primary" size="lg" icon>Reserve your goat</Btn></Link>
            </div>
          </Wrap>
        </section>
      </main>
      <Footer farm={farm} />
    </>
  )
}
