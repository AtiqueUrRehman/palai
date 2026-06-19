'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Leaf, Truck, ChevronRight } from 'lucide-react'
import Wrap from '@/components/Wrap'
import SectionHeading from '@/components/SectionHeading'
import Btn from '@/components/Btn'

const STEPS = [
  { k: '01', t: 'Pick by video', d: 'Browse healthy, weighed goats. Watch a clip of each one and reserve the one you like with full payment.' },
  { k: '02', t: 'We raise & care', d: 'Your goat stays on our farm. Daily feed, clean water, vaccinations and a vet on call — for a fixed monthly care charge.' },
  { k: '03', t: 'Monthly updates', d: 'Get a fresh video and weight update on Facebook every month, so you watch your animal grow.' },
  { k: '04', t: 'Delivered before Eid', d: 'We deliver to your doorstep 3–5 days prior to Eid-ul-Adha, healthy and ready for Qurbani.' },
]

const PRICES = [
  { icon: Check, title: 'Goat price', amount: 'From Rs 65,000', note: 'One-time, set when you reserve. Varies by breed, weight and age — shown on each goat.', highlight: false },
  { icon: Leaf, title: 'Monthly care', amount: 'Rs 12,000–15,000 / mo', note: 'Per goat, billed monthly until Eid. Covers feed, water, shelter, vaccinations and vet care.', highlight: true },
  { icon: Truck, title: 'Delivery', amount: 'Rs 5,000 or less', note: 'Rawalpindi, Islamabad, Lahore, Faisalabad, Gujranwala, Gujrat, Sialkot & Wazirabad — 3–5 days prior to Eid.', highlight: false },
]

const FAQ = [
  { q: 'What does the monthly care charge cover?', a: 'Feed, clean water, shelter, routine vaccination and vet checkups. It is a fixed amount per goat per month, billed until delivery on Eid.' },
  { q: 'What if my goat falls sick or dies?', a: 'If your goat falls sick, our team of professional veterinarians will treat it at no additional cost to you. In the unlikely event of death, 50% of the total amount paid will be refunded — see Terms.' },
  { q: 'Can I visit the farm?', a: 'Yes. You are welcome to visit by appointment and meet your goat in person before Eid.' },
  { q: 'How is delivery handled?', a: 'Rs 5,000 or less per animal in Rawalpindi, Islamabad, Lahore, Faisalabad, Gujranwala, Gujrat, Sialkot and Wazirabad — delivered 3–5 days prior to Eid. Other cities at actual transport cost.' },
]

export default function HowPage() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <section style={{ padding: 'clamp(26px,5vw,48px) 0 8px' }}>
        <Wrap>
          <SectionHeading label="How it works" title="Four steps to Eid" sub="From picking your goat to Qurbani — here's exactly how it goes, and what it costs." />
        </Wrap>
      </section>

      <section style={{ padding: 'clamp(22px,3vw,34px) 0 8px' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'clamp(14px,2vw,20px)' }} className="md:[grid-template-columns:repeat(2,1fr)]">
            {STEPS.map(s => (
              <div key={s.k} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 'clamp(16px,2vw,22px)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 13, background: 'var(--teal)', color: 'var(--gold)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>{s.k}</div>
                <div style={{ display: 'grid', gap: 4 }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{s.t}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--sub)' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section style={{ padding: 'clamp(26px,5vw,52px) 0 8px' }}>
        <Wrap>
          <SectionHeading label="Pricing" title="Simple, no surprises" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'clamp(13px,2vw,20px)', marginTop: 'clamp(18px,3vw,36px)' }} className="md:[grid-template-columns:repeat(3,1fr)]">
            {PRICES.map(p => (
              <div key={p.title} style={{ background: p.highlight ? 'var(--teal-soft)' : 'var(--surface)', border: `1px solid ${p.highlight ? 'transparent' : 'var(--line)'}`, borderRadius: 'var(--radius-lg)', padding: 'clamp(17px,2vw,24px)', boxShadow: p.highlight ? 'none' : 'var(--shadow-sm)', display: 'flex', gap: 14 }}>
                <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 15, background: p.highlight ? 'var(--teal)' : 'var(--teal-soft)', display: 'grid', placeItems: 'center' }}>
                  <p.icon size={23} color={p.highlight ? '#fff' : 'var(--teal)'} />
                </div>
                <div style={{ display: 'grid', gap: 6, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 750, fontSize: 14.5, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{p.amount}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45, color: 'var(--sub)' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section style={{ padding: 'clamp(28px,5vw,52px) 0 clamp(40px,7vw,72px)' }}>
        <Wrap max={780}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(20px,2.5vw,24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 14 }}>Common questions</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {FAQ.map((f, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: 'var(--font-head)', fontWeight: 650, fontSize: 14.5, lineHeight: 1.35, color: 'var(--ink)' }}>
                  {f.q}
                  <span style={{ flexShrink: 0, transform: open === i ? 'rotate(90deg)' : 'none', transition: 'transform .2s', display: 'flex' }}>
                    <ChevronRight size={17} color="var(--gold)" />
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 240 : 0, overflow: 'hidden', transition: 'max-height .25s ease' }}>
                  <p style={{ margin: 0, padding: '0 16px 15px', fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--sub)' }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link href="/goats"><Btn kind="primary" size="lg" icon>Browse available goats</Btn></Link>
          </div>
        </Wrap>
      </section>
    </>
  )
}
