// lib/require-admin.ts
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { CustomJwtSessionClaims } from '@repo/types'

/**
 * Restricts access to users with the administrator role.
 *
 * Redirects users without the administrator role to `/unauthorized`.
 */
export async function requireAdmin() {
  const { sessionClaims } = await auth()
  const role = (sessionClaims as CustomJwtSessionClaims)?.metadata?.role

  if (role !== 'admin') {
    redirect('/unauthorized')
  }
}