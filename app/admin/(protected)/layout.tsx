import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'
import AdminShell from './AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const signOutAction = async () => {
    'use server'
    await signOut({ redirectTo: '/admin/login' })
  }

  return <AdminShell signOutAction={signOutAction}>{children}</AdminShell>
}
