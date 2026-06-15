import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getUploadUrl } from '@/lib/r2'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { filename, contentType, farmSlug, goatId } = await request.json()
    if (!filename || !contentType) return NextResponse.json({ error: 'filename and contentType required' }, { status: 400 })

    const ext = filename.split('.').pop()
    const key = `${farmSlug ?? 'malik'}/${goatId ?? 'unknown'}/${Date.now()}.${ext}`

    const { uploadUrl, publicUrl } = await getUploadUrl(key, contentType)
    return NextResponse.json({ uploadUrl, publicUrl })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[upload]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
