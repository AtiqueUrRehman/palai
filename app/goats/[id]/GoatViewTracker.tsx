'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export default function GoatViewTracker({ goatId, goatName }: { goatId: string; goatName: string }) {
  useEffect(() => {
    track('goat_view', { goat_id: goatId, goat_name: goatName })
  }, [goatId, goatName])

  return null
}
