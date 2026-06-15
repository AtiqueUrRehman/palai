export type FarmTheme = {
  bg: string
  surface: string
  alt: string
  ink: string
  sub: string
  faint: string
  teal: string
  tealDeep: string
  tealSoft: string
  gold: string
  goldSoft: string
}

export type FarmConfig = {
  slug: string
  name: string
  tagline: string
  location: string
  phone: string
  whatsapp: string
  theme: Partial<FarmTheme>
}

const BASE_THEME: FarmTheme = {
  bg: '#f4eee1',
  surface: '#fffdf7',
  alt: '#ece2cf',
  ink: '#241f16',
  sub: '#6f6452',
  faint: '#9a8f79',
  teal: '#13514a',
  tealDeep: '#0e3c37',
  tealSoft: '#dcebe5',
  gold: '#c08a2b',
  goldSoft: '#f0e2c6',
}

export const farms: Record<string, FarmConfig> = {
  malik: {
    slug: 'malik',
    name: 'Sher Muhammad Livestock Farms',
    tagline: 'Raised in the fields of Thoha Mehram Khan. Delivered to your door.',
    location: 'Thoha Mehram Khan, Rawalpindi',
    phone: '+92 301 9558219',
    whatsapp: '+92 301 9558219',
    theme: {},
  },
}

export const defaultFarm = 'malik'

export function getFarm(host: string): FarmConfig {
  const subdomain = host.split('.')[0]
  return farms[subdomain] ?? farms[defaultFarm]
}

export function getTheme(farm: FarmConfig): FarmTheme {
  return { ...BASE_THEME, ...farm.theme }
}

export function themeToCssVars(theme: FarmTheme): Record<string, string> {
  return {
    '--bg': theme.bg,
    '--surface': theme.surface,
    '--alt': theme.alt,
    '--ink': theme.ink,
    '--sub': theme.sub,
    '--faint': theme.faint,
    '--teal': theme.teal,
    '--teal-deep': theme.tealDeep,
    '--teal-soft': theme.tealSoft,
    '--gold': theme.gold,
    '--gold-soft': theme.goldSoft,
  }
}
