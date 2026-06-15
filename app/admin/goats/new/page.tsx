import GoatForm from '../GoatForm'

export default function NewGoatPage() {
  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ margin: '0 0 24px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>Add goat</h1>
      <GoatForm />
    </div>
  )
}
