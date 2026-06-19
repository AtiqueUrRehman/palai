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
  { t: 'Mortality', d: 'Should the animal die while in the Farm\'s custody, fifty percent (50%) of the total amount paid by the client shall be refunded. The remaining balance shall be retained to cover care and operational costs incurred.' },
  { t: 'Non-payment', d: 'In the event that monthly dues remain unpaid for two (2) consecutive months, the Farm reserves the right to sell the animal without further notice. All outstanding dues shall be deducted from the sale proceeds, and any remaining balance shall be returned to the client within a reasonable timeframe.' },
  { t: 'Program duration & commencement', d: 'The custody period is ten (10) months. The program commences on 1 July 2026.' },
  { t: 'Payment obligation', d: 'Monthly fees are due and payable on a fixed schedule. Timely payment is a condition of continued participation in the program.' },
]

const TERMS = [
  { t: 'Reservation & token', d: 'A goat is reserved against your name only after a token payment is received. The token is adjusted into the final price. Until the token is paid, any goat shown as available may be reserved by another client.' },
  { t: 'Monthly care charges', d: 'A fixed monthly care charge applies per reserved goat from the date of reservation until delivery on Eid. Charges are billed in advance each month and are non-refundable once a month has begun, as feed and care are provided continuously.' },
  { t: 'Health, mortality & replacement', d: 'All animals are vaccinated and monitored by our farm staff and an on-call veterinarian. Sher Muhammad Livestock Farms bears the risk of illness or mortality before delivery. Should your reserved animal become unfit for qurbani, we will provide a replacement of equal or greater value at no additional cost.' },
  { t: 'Weight & description', d: 'Weights and ages are recorded at the time of listing and may increase naturally before Eid. Listing videos and details are provided in good faith; minor variation in appearance is normal as the animal grows.' },
  { t: 'Delivery', d: 'Delivery is made to the address provided by the client on the morning of Eid-ul-Adha, before Eid prayers where possible. Free delivery applies within listed areas; transport for other locations is charged at actual cost and confirmed in advance.' },
  { t: 'Payment & balance', d: 'The remaining balance of the goat price, along with any outstanding care charges, must be cleared at least three days before Eid. Delivery is subject to full and cleared payment.' },
  { t: 'Cancellation & refund', d: 'You may cancel up to 30 days before Eid; the goat price token is refundable less any care charges already incurred. Cancellations within 30 days of Eid forfeit the token, as the animal is held exclusively for you.' },
  { t: 'Force majeure', d: 'Sher Muhammad Livestock Farms is not liable for delays or non-performance caused by events beyond reasonable control, including disease outbreaks, government restrictions or natural disasters. In such cases we will offer a replacement or refund of amounts paid toward the goat price.' },
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
            <SectionHeading label="The agreement" title="Terms & conditions" sub="Plain-language terms for reserving and caring for your goat until Eid." />
          </Wrap>
        </section>
        <section style={{ padding: 'clamp(18px,2.5vw,28px) 0 clamp(40px,7vw,72px)' }}>
          <Wrap max={860}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 12 }} className="md:[grid-template-columns:repeat(2,1fr)]">
              {TERMS.map((s, i) => (
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
              By paying a reservation token you confirm you have read and agree to these terms. Questions? Message us on WhatsApp at {farm.whatsapp}.
            </p>
          </Wrap>
        </section>

        {/* Farm Custody Program */}
        <section style={{ padding: 'clamp(18px,2.5vw,28px) 0 clamp(40px,7vw,72px)', borderTop: '1px solid var(--line)' }}>
          <Wrap max={860}>
            <SectionHeading label="Farm Custody Program" title="Apna Bakra Khud Palein — Terms" sub="Terms governing the Farm Custody Program, effective 1 July 2026." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 12, marginTop: 'clamp(18px,3vw,36px)' }} className="md:[grid-template-columns:repeat(2,1fr)]">
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
          </Wrap>
        </section>
      </main>
      <Footer farm={farm} />
    </>
  )
}
