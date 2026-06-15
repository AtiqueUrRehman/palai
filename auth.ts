import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: user } = await supabaseAdmin
          .from('admin_users')
          .select('id, email, password_hash, farm_slug')
          .eq('email', credentials.email as string)
          .single()

        if (!user) return null

        const valid = bcrypt.compareSync(credentials.password as string, user.password_hash)
        if (!valid) return null

        return { id: user.id, email: user.email, farmSlug: user.farm_slug }
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.farmSlug = (user as { farmSlug: string }).farmSlug
      return token
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(session.user as any).farmSlug = token.farmSlug as string
      return session
    },
  },
})
