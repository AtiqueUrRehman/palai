import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createBunnyVideo, signBunnyUpload, bunnyVideoUrl } from '@/lib/bunny'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title } = await req.json()
  const guid = await createBunnyVideo(title || 'goat')
  const { signature, expiry } = signBunnyUpload(guid)

  return NextResponse.json({
    guid,
    signature,
    expiry,
    libraryId: process.env.BUNNY_STREAM_LIBRARY_ID!,
    publicUrl: bunnyVideoUrl(guid),
  })
}
