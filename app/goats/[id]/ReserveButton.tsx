'use client'

import { useState } from 'react'
import Btn from '@/components/Btn'

export default function ReserveButton({ goatName, whatsapp, full }: { goatName: string; whatsapp: string; full?: boolean }) {
  const [toasted, setToasted] = useState(false)

  const handleReserve = () => {
    setToasted(true)
    setTimeout(() => setToasted(false), 3200)
  }

  return (
    <>
      <Btn kind="primary" size="lg" full={full} onClick={handleReserve}>
        Reserve {goatName}
      </Btn>
      {toasted && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--ink)', color: '#fff', borderRadius: 14, padding: '14px 22px',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, lineHeight: 1.4,
          zIndex: 50, boxShadow: 'var(--shadow)', whiteSpace: 'nowrap',
          animation: 'fadeIn .18s ease',
        }}>
          {goatName} reserved — we&apos;ll WhatsApp you the token details.
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </>
  )
}
