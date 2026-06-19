import { headers } from 'next/headers'
import Link from 'next/link'
import { Video, Leaf, Bell, Truck, Star, ArrowRight } from 'lucide-react'
import { getFarm } from '@/lib/farms'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wrap from '@/components/Wrap'
import GoatCard from '@/components/GoatCard'
import SectionHeading from '@/components/SectionHeading'
import Tag from '@/components/Tag'
import Label from '@/components/Label'
import Btn from '@/components/Btn'

const STATS = [
  { n: '1400+', l: 'Goats delivered till now' },
  { n: '100%', l: 'Customer satisfaction' },
  { n: '7 yrs', l: 'Raising on the same farm' },
]

const FEATURES = [
  { icon: Video, title: 'Choose by video', desc: 'See every goat on camera — weight, teeth and temperament — before you commit.' },
  { icon: Leaf, title: 'Cared for daily', desc: 'Fresh feed, clean water, vaccinations and a vet on call for a fixed monthly charge.' },
  { icon: Bell, title: 'Monthly updates', desc: 'A new video and weight update on Facebook every month until Eid.' },
  { icon: Truck, title: 'Delivered before Eid', desc: 'Doorstep delivery (Rs 5,000 or less) in major cities, 3–5 days prior to Eid.' },
]

export default async function HomePage() {
  const h = await headers()
  const host = h.get('host') ?? ''
  const farm = getFarm(host)

  const { data: goats } = await supabase
    .from('goats')
    .select('*')
    .eq('farm_slug', farm.slug)
    .eq('reserved', false)
    .order('created_at', { ascending: false })
    .limit(4)

  const featured = goats ?? []

  return (
    <>
      <Header farmName={farm.name} />
      <main>
        {/* hero */}
        <section style={{ padding: 'clamp(30px,5vw,52px) 0 clamp(36px,6vw,60px)', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
          <Wrap>
            <div className="md:grid" style={{ gridTemplateColumns: '1.02fr 0.98fr', gap: 50, alignItems: 'center' }}>
              <div style={{ display: 'grid', gap: 18 }}>
                <Tag tone="teal"><Star size={13} color="var(--teal)" fill="var(--teal)" /> Eid-ul-Adha 2027 · Booking open</Tag>
                <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(36px,5.5vw,54px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                  Pick your Qurbani goat.<br />
                  <span style={{ color: 'var(--teal)' }}>We raise it</span> till Eid.
                </h1>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'clamp(15.5px,1.7vw,17.5px)', lineHeight: 1.55, color: 'var(--sub)', maxWidth: 460 }}>
                  Choose a healthy goat by video, reserve it, and we care for it on our farm — delivered to your doorstep 3–5 days prior to Eid.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link href="/goats"><Btn kind="primary" size="lg" icon>Browse goats</Btn></Link>
                  <Link href="/how-it-works"><Btn kind="secondary" size="lg">How it works</Btn></Link>
                </div>
              </div>
              <div style={{ marginTop: 24 }} className="md:mt-0">
                <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tour.png" alt="Farm tour" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(10px,2.5vw,24px)', marginTop: 'clamp(22px,4vw,44px)', maxWidth: 640 }}>
              {STATS.map(s => (
                <div key={s.n} style={{ display: 'grid', gap: 5 }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,38px)', lineHeight: 1, color: 'var(--teal)', letterSpacing: '-0.02em' }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'clamp(12px,1.3vw,14px)', lineHeight: 1.3, color: 'var(--sub)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* features */}
        <section style={{ padding: 'clamp(34px,6vw,64px) 0' }}>
          <Wrap>
            <SectionHeading label="Why families pick us" title="A goat you trust, raised the right way" />
            <div className="md:grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(20px,3vw,32px)', marginTop: 'clamp(24px,4vw,40px)' }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
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

        {/* featured goats */}
        {featured.length > 0 && (
          <section style={{ padding: '8px 0 clamp(36px,6vw,64px)' }}>
            <Wrap>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(18px,2.5vw,28px)', gap: 12 }}>
                <SectionHeading label="Available now" title="Meet a few of the herd" />
                <Link href="/goats" style={{ textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13.5, color: 'var(--teal)', display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', paddingBottom: 4 }}>
                  See all <ArrowRight size={15} color="var(--teal)" />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(13px,2vw,20px)' }} className="md:[grid-template-columns:repeat(4,1fr)]">
                {featured.map((g, i) => <GoatCard key={g.id} goat={g} idx={i} />)}
              </div>
            </Wrap>
          </section>
        )}

        {/* results CTA */}
        <section style={{ padding: '4px 0 clamp(40px,7vw,72px)' }}>
          <Wrap>
            <div style={{ background: 'var(--teal)', borderRadius: 'var(--radius-lg)', padding: 'clamp(26px,4vw,48px) clamp(22px,4vw,48px)', color: '#fff', display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,40px)', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'grid', gap: 14, maxWidth: 520 }}>
                <Label><span style={{ color: 'var(--gold)' }}>Last Eid</span></Label>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(23px,3vw,32px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                  210+ families collected their goat on time
                </h2>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.5vw,15.5px)', lineHeight: 1.5, color: 'rgba(255,255,255,0.78)' }}>
                  Watch real delivery videos from last year&apos;s Eid before you decide.
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Link href="/results"><Btn kind="gold" size="lg" icon>Watch last year</Btn></Link>
              </div>
            </div>
          </Wrap>
        </section>
      </main>
      <Footer farm={farm} />
    </>
  )
}
