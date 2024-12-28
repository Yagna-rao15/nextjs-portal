"use client"

import { Button } from '@/components/ui/button'
import { logout } from '@/actions/logout'
import { useRouter } from 'next/navigation'

export default function ClientLogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

