import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { farms, defaultFarm } from '@/lib/farms'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const subdomain = host.split('.')[0].replace('www', defaultFarm)
  const farm = farms[subdomain] ?? farms[defaultFarm]

  const response = NextResponse.next()
  response.headers.set('x-farm-slug', farm.slug)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
