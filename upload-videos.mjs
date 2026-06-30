import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { basename } from 'path'

const R2 = new S3Client({
  region: 'auto',
  endpoint: 'https://711886c77a0f96c86c196bae8cc5c0d0.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'f7177d2a6a92babd84b75653243a7a77',
    secretAccessKey: 'c5283b5babc1efa84e5c787a9fc4b670bf21de3aff0dc3f58c522e66c6dfd044',
  },
})

const supabase = createClient(
  'https://bdsltgvdrnryabiihewb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkc2x0Z3Zkcm5yeWFiaWloZXdiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk0MTQ3MCwiZXhwIjoyMDk2NTE3NDcwfQ.2l17e1hUAHWO5oG3HYfessShWitTFMb4ByuuW0JRXqA',
)

const VIDEOS = [
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.24.10.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.24.21.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.24.33.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.24.45.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.24.56.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.25.08.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.25.23.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.25.36.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.25.56.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.28.54.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.29.18.mp4',
  '/Users/atique/Desktop/videos/WhatsApp Video 2026-06-20 at 00.29.31.mp4',
]

for (const filePath of VIDEOS) {
  const key = `malik/delivery/${Date.now()}-${basename(filePath).replace(/\s+/g, '-')}`
  const body = readFileSync(filePath)

  process.stdout.write(`Uploading ${basename(filePath)}... `)

  await R2.send(new PutObjectCommand({
    Bucket: 'palai-videos',
    Key: key,
    Body: body,
    ContentType: 'video/mp4',
  }))

  const publicUrl = `https://pub-eeb76dc507a145a0b7e197705c8dbd2b.r2.dev/${key}`

  const { error } = await supabase.from('delivery_videos').insert({
    id: crypto.randomUUID(),
    farm_slug: 'malik',
    video_url: publicUrl,
    title: '',
    breed: '',
    dur: '',
  })

  if (error) {
    console.log(`DB error: ${error.message}`)
  } else {
    console.log(`done ✓`)
  }
}

console.log('\nAll done!')
