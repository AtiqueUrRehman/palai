import { headers } from 'next/headers'
import { getFarm } from '@/lib/farms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function GoatsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const farm = getFarm(h.get('host') ?? '')
  return (
    <>
      <Header farmName={farm.name} />
      <main>{children}</main>
      <Footer farm={farm} />
    </>
  )
}
