import crypto from 'crypto'

const LIBRARY_ID = process.env.BUNNY_STREAM_LIBRARY_ID!
const API_KEY = process.env.BUNNY_STREAM_API_KEY!
const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME!

export async function createBunnyVideo(title: string): Promise<string> {
  const res = await fetch(`https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`, {
    method: 'POST',
    headers: { AccessKey: API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
  if (!res.ok) throw new Error(`Bunny createVideo ${res.status}: ${await res.text()}`)
  const { guid } = await res.json()
  return guid as string
}

export function signBunnyUpload(videoId: string): { signature: string; expiry: number } {
  const expiry = Math.floor(Date.now() / 1000) + 3600
  const signature = crypto
    .createHash('sha256')
    .update(LIBRARY_ID + API_KEY + expiry + videoId)
    .digest('hex')
  return { signature, expiry }
}

export function bunnyVideoUrl(guid: string): string {
  return `https://${CDN_HOSTNAME}/${guid}/play_720p.mp4`
}
