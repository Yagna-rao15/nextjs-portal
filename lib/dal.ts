"use server"

import { cookies } from 'next/headers'
import { decrypt, } from '@/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value

  if (!cookie) {
    redirect('/login')
  }

  const session = await decrypt(cookie)

  // NOTE: Ignore the Errors in this file 
  if (!session?.user?.id) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.user.id }
})
