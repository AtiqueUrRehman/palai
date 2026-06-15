import type { Metadata } from 'next'
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import { getFarm, getTheme, themeToCssVars } from '@/lib/farms'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sher Muhammad Livestock Farms — Qurbani Goats',
  description: 'Reserve your Eid-ul-Adha goat by video. Raised in Thoha Mehram Khan, we care for it and deliver on Eid morning.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const host = h.get('host') ?? ''
  const farm = getFarm(host)
  const theme = getTheme(farm)
  const cssVars = themeToCssVars(theme)

  return (
    <html
      lang="en"
      style={cssVars as React.CSSProperties}
      className={`${bricolage.variable} ${plusJakarta.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
