import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-eeb76dc507a145a0b7e197705c8dbd2b.r2.dev' },
      { protocol: 'https', hostname: 'bdsltgvdrnryabiihewb.supabase.co' },
    ],
  },
}

export default nextConfig
