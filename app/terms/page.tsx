import { headers } from 'next/headers'
import { getFarm } from '@/lib/farms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wrap from '@/components/Wrap'
import SectionHeading from '@/components/SectionHeading'

const CUSTODY = [
  { t: 'Weight categories & monthly fees', d: 'Category A: Live weight 100–130 kg — Rs 15,000 per month. Category B: Live weight 75–90 kg — Rs 12,000 per month.' },
  { t: 'Animal placement', d: 'The client may select an animal from the Farm\'s existing stock, or specify requirements whereupon the Farm shall procure a suitable animal from the market on the client\'s behalf and register it under their name.' },
  { t: 'Progress updates', d: 'The Farm shall provide a minimum of one live video recording accompanied by a current weight measurement per calendar month for the duration of the custody period.' },
  { t: 'Veterinary care', d: 'In the event of illness, the Farm shall bear full responsibility for the animal\'s treatment, including all veterinary consultations and medications, at no additional cost to the client.' },
  { t: 'Mortality', d: 'Should the animal die while in the Farm\'s custody, fifty percent (50%) of the total amount paid by the client shall be refunded.' },
  { t: 'Non-payment', d: 'In the event that monthly dues remain unpaid for two (2) consecutive months, the Farm reserves the right to sell the animal without further notice. All outstanding dues shall be deducted from the sale proceeds, and any remaining balance shall be returned to the client within a reasonable timeframe.' },
  { t: 'Program duration & commencement', d: 'The custody period is ten (10) months. The program commences on 1 July 2026.' },
  { t: 'Payment obligation', d: 'Monthly fees are due and payable on a fixed schedule. Timely payment is a condition of continued participation in the program.' },
]

export default async function TermsPage() {
  const h = await headers()
  const farm = getFarm(h.get('host') ?? '')

  return (
    <>
      <Header farmName={farm.name} />
      <main>
        <section style={{ padding: 'clamp(26px,5vw,48px) 0 8px' }}>
          <Wrap max={860}>
            <SectionHeading label="Farm Custody Program" title="Apna Bakra Khud Palein — Terms" sub="Terms governing the Farm Custody Program, effective 1 July 2026." />
          </Wrap>
        </section>
        <section style={{ padding: 'clamp(18px,2.5vw,28px) 0 clamp(40px,7vw,72px)' }}>
          <Wrap max={860}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 12 }} className="md:[grid-template-columns:repeat(2,1fr)]">
              {CUSTODY.map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 'clamp(18px,2vw,22px)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 13, lineHeight: 1.4, color: 'var(--gold)', flexShrink: 0, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div style={{ display: 'grid', gap: 7 }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15.5, lineHeight: 1.25, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{s.t}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--sub)' }}>{s.d}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--faint)', padding: '16px 4px 0' }}>
              Questions? Message us on WhatsApp at {farm.whatsapp}.
            </p>
          </Wrap>
        </section>
      </main>
      <Footer farm={farm} />
    </>
  )
}
