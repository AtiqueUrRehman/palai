import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Scale, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { fmt } from '@/lib/fmt'
import VideoThumb from '@/components/VideoThumb'
import Tag from '@/components/Tag'
import Wrap from '@/components/Wrap'
import ReserveButton from './ReserveButton'

export default async function GoatDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const { data: goat } = await supabase
    .from('goats')
    .select('*')
    .eq('id', id)
    .single()

  if (!goat) notFound()

  const specs = [
    { k: 'Breed', v: goat.breed },
    { k: 'Live weight', v: `${goat.weight_kg} kg` },
    { k: 'Teeth (age)', v: goat.teeth },
    { k: 'Goat ID', v: goat.id },
  ]

  return (
    <>
      <section style={{ padding: 'clamp(16px,2vw,24px) 0 0' }}>
        <Wrap>
          <Link href="/goats" style={{ textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13.5, color: 'var(--sub)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 0' }}>
            <ArrowLeft size={16} color="var(--sub)" /> All goats
          </Link>
        </Wrap>
      </section>

      <section style={{ padding: 'clamp(10px,1.5vw,14px) 0 clamp(0px,0vw,56px)' }}>
        <Wrap>
          <div className="md:grid" style={{ gridTemplateColumns: '1.05fr 0.95fr', gap: 44, alignItems: 'start' }}>
            {/* media */}
            <div>
              <VideoThumb ratio="16 / 12" src={goat.video_url} dur={goat.video_dur} label={`${goat.id}.mp4`} big breedSeed={2} />
              {goat.photo_urls?.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
                  {(goat.photo_urls as string[]).slice(0, 3).map((url: string, i: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={url} alt={goat.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                  ))}
                </div>
              )}
            </div>

            {/* info */}
            <div style={{ marginTop: 20 }} className="md:mt-0">
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h1 style={{ margin: 0, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,34px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                      {goat.name}
                    </h1>
                    {goat.tag && <Tag tone="gold">{goat.tag}</Tag>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: 'var(--faint)', marginTop: 6 }}>
                    {goat.breed} · {goat.teeth}
                  </div>
                </div>

                {/* specs */}
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  {specs.map((s, i) => (
                    <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 16px', borderTop: i ? '1px solid var(--line-soft)' : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--sub)' }}>{s.k}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 650, fontSize: 14, color: 'var(--ink)' }}>{s.v}</span>
                    </div>
                  ))}
                </div>

                {/* cost box */}
                <div style={{ background: 'var(--teal-soft)', borderRadius: 'var(--radius-lg)', padding: '18px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, color: 'var(--teal)', marginBottom: 12 }}>Your cost</div>
                  {[
                    { k: 'Goat price (one-time)', v: fmt(goat.price), bold: true },
                    { k: 'Monthly care till Eid', v: `${fmt(goat.care_fee)}/mo`, bold: false },
                    { k: 'Doorstep delivery', v: 'Free in zone', bold: false },
                  ].map(r => (
                    <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: r.bold ? 600 : 400, fontSize: 14, lineHeight: 1.3, color: 'var(--ink)' }}>{r.k}</span>
                      <span style={{ fontFamily: 'var(--font-head)', fontWeight: r.bold ? 750 : 550, fontSize: 14.5, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{r.v}</span>
                    </div>
                  ))}
                  <div style={{ height: 1, background: 'rgba(15,32,29,0.12)', margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, lineHeight: 1.3, color: 'var(--gold)' }}>Token to reserve today</span>
                    <span style={{ fontFamily: 'var(--font-head)', fontWeight: 750, fontSize: 14.5, color: 'var(--gold)', whiteSpace: 'nowrap' }}>{fmt(20000)}</span>
                  </div>
                </div>

                {!goat.reserved && (
                  <div className="hidden md:block">
                    <ReserveButton goatName={goat.name} whatsapp="+92 300 1234567" />
                  </div>
                )}
                {goat.reserved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--sub)' }}>
                    <Check size={16} /> This goat has been reserved
                  </div>
                )}
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--faint)' }}>
                  Token is adjusted into the final price. Care charges billed monthly until delivery. See Terms for health &amp; replacement policy.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* sticky reserve bar (mobile) */}
      {!goat.reserved && (
        <div className="md:hidden" style={{ position: 'sticky', bottom: 0, marginTop: 18, padding: '14px 22px', background: 'rgba(244,238,225,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center', zIndex: 20 }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 17, lineHeight: 1, color: 'var(--ink)' }}>{fmt(goat.price)}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11.5, lineHeight: 1.3, color: 'var(--faint)', marginTop: 2 }}>+ {fmt(goat.care_fee)}/mo</div>
          </div>
          <div style={{ flex: 1 }}>
            <ReserveButton goatName={goat.name} whatsapp="+92 300 1234567" full />
          </div>
        </div>
      )}
    </>
  )
}
