import { NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { auth } from '@/auth'
import { r2, BUCKET, PUBLIC_URL } from '@/lib/r2'

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const farmSlug = (formData.get('farmSlug') as string) || 'malik'
  const goatId = (formData.get('goatId') as string) || 'unknown'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const key = `${farmSlug}/${goatId}/${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }))

  return NextResponse.json({ publicUrl: `${PUBLIC_URL}/${key}` })
}
