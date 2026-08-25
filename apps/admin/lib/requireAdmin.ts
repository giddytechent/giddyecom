// lib/require-admin.ts
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { CustomJwtSessionClaims } from '@repo/types'

export async function requireAdmin() {
  const { sessionClaims } = await auth()
  const role = (sessionClaims as CustomJwtSessionClaims)?.metadata?.role

  if (role !== 'admin') {
    redirect('/unauthorized')
  }
}