import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import type { Goat } from '@/types/database'
import GoatForm from '../../GoatForm'

export default async function EditGoatPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const { data } = await supabaseAdmin.from('goats').select('*').eq('id', id).single()
  if (!data) notFound()

  const goat = data as Goat

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ margin: '0 0 24px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>Edit — {goat.name}</h1>
      <GoatForm goat={goat} />
    </div>
  )
}
