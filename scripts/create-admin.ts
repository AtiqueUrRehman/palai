// Run: npx tsx scripts/create-admin.ts
// Creates the first admin user for a farm.

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

// ── Configure here ────────────────────────────────────────────
const EMAIL = 'admin@malikfarms.com'
const PASSWORD = 'changeme123'
const FARM_SLUG = 'malik'
// ─────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(url, serviceRole)
  const hash = bcrypt.hashSync(PASSWORD, 12)

  const { error } = await supabase.from('admin_users').upsert({
    farm_slug: FARM_SLUG,
    email: EMAIL,
    password_hash: hash,
  }, { onConflict: 'email' })

  if (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }

  console.log(`✓ Admin created: ${EMAIL} / ${PASSWORD}`)
  console.log('  Change the password after first login.')
}

main()
