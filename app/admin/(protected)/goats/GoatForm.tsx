'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Goat } from '@/types/database'
import Btn from '@/components/Btn'

const BREEDS = ['Beetal', 'Teddy (Gujri)', 'Makhi Cheeni', 'Barbari', 'Nachi', 'Kamori']
const TAGS = ['', 'Premium', 'Popular', 'Heavy', 'New']

type Props = { goat?: Goat }

export default function GoatForm({ goat }: Props) {
  const router = useRouter()
  const isEdit = !!goat

  const [form, setForm] = useState({
    id: goat?.id ?? '',
    name: goat?.name ?? '',
    breed: goat?.breed ?? BREEDS[0],
    teeth: goat?.teeth ?? '2 daant',
    weight_kg: goat?.weight_kg ?? 40,
    price: goat?.price ?? 80000,
    care_fee: goat?.care_fee ?? 4000,
    tag: goat?.tag ?? '',
    reserved: goat?.reserved ?? false,
    video_dur: goat?.video_dur ?? '',
    notes: goat?.notes ?? '',
  })

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      let videoUrl = goat?.video_url ?? null

      if (videoFile) {
        setUploading(true)
        const fd = new FormData()
        fd.append('file', videoFile)
        fd.append('farmSlug', 'malik')
        fd.append('goatId', form.id || 'new')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed')
        const { publicUrl } = await res.json()
        videoUrl = publicUrl
        setUploading(false)
      }

      const payload = {
        ...form,
        farm_slug: 'malik',
        tag: form.tag || null,
        video_url: videoUrl,
        photo_urls: goat?.photo_urls ?? [],
      }

      const url = isEdit ? `/api/goats/${goat.id}` : '/api/goats'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

      if (!res.ok) {
        const { error: e } = await res.json()
        throw new Error(e)
      }

      router.push('/admin/goats')
      router.refresh()
    } catch (err) {
      setError((err as Error).message)
      setSaving(false)
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete ${goat?.name}? This cannot be undone.`)) return
    await fetch(`/api/goats/${goat!.id}`, { method: 'DELETE' })
    router.push('/admin/goats')
    router.refresh()
  }

  const field = (label: string, node: React.ReactNode) => (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{label}</label>
      {node}
    </div>
  )

  const input = (type: string, value: string | number, onChange: (v: string) => void, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} {...extra}
      style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none', width: '100%' }} />
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
      {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#dc2626' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {!isEdit && field('Goat ID (e.g. BTL-015)', input('text', form.id, v => set('id', v), { required: true, placeholder: 'BTL-015' }))}
        {field('Name', input('text', form.name, v => set('name', v), { required: true, placeholder: 'Sultan' }))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {field('Breed', (
          <select value={form.breed} onChange={e => set('breed', e.target.value)} style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none' }}>
            {BREEDS.map(b => <option key={b}>{b}</option>)}
          </select>
        ))}
        {field('Teeth', input('text', form.teeth, v => set('teeth', v), { placeholder: '2 daant' }))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {field('Weight (kg)', input('number', form.weight_kg, v => set('weight_kg', parseInt(v)), { min: 10, max: 200 }))}
        {field('Price (Rs)', input('number', form.price, v => set('price', parseInt(v)), { min: 0 }))}
        {field('Care fee/mo (Rs)', input('number', form.care_fee, v => set('care_fee', parseInt(v)), { min: 0 }))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {field('Tag', (
          <select value={form.tag} onChange={e => set('tag', e.target.value)} style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none' }}>
            {TAGS.map(t => <option key={t} value={t}>{t || '(none)'}</option>)}
          </select>
        ))}
        {field('Video duration (e.g. 0:48)', input('text', form.video_dur, v => set('video_dur', v), { placeholder: '0:48' }))}
      </div>

      {field('Upload video', (
        <div>
          <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] ?? null)} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)' }} />
          {goat?.video_url && <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--teal)' }}>Current video uploaded ✓</p>}
        </div>
      ))}

      {field('Notes (internal)', (
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
          style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical', width: '100%' }} />
      ))}

      {isEdit && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          <input type="checkbox" checked={form.reserved} onChange={e => set('reserved', e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--teal)' }} />
          Mark as reserved
        </label>
      )}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <Btn type="submit" kind="primary" size="lg" disabled={saving || uploading}>
          {uploading ? 'Uploading video…' : saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add goat'}
        </Btn>
        {isEdit && (
          <button type="button" onClick={handleDelete} style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: '#dc2626', padding: '8px 4px' }}>
            Delete goat
          </button>
        )}
      </div>
    </form>
  )
}
