'use client'

import Btn from '@/components/Btn'
import { track } from '@/lib/analytics'

export default function ReserveButton({
  goatName,
  goatId,
  goatTag,
  full,
}: {
  goatName: string
  goatId: string
  goatTag?: string | null
  full?: boolean
}) {
  const tag = goatTag ? ` [${goatTag}]` : ''
  const message = `Assalam o Alaikum, I want to reserve *${goatName}*${tag} (ID: ${goatId}). Please share the payment details.`
  const url = `https://wa.me/923019558219?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: full ? 'block' : 'inline-block', width: full ? '100%' : undefined }}
      onClick={() => track('reserve_click', { goat_id: goatId, goat_name: goatName, goat_tag: goatTag ?? '' })}
    >
      <Btn kind="primary" size="lg" full={full}>
        Reserve {goatName}
      </Btn>
    </a>
  )
}
