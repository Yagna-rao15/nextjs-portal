import { verifySession } from '@/lib/dal'
import { redirect } from 'next/navigation'
import ClientLogoutButton from './ClientLogoutButton'

export default async function Dashboard() {
  const session = await verifySession()

  if (session.isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
        <div className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome, Admin! You have access to the admin panel.
        </div>
        {/* Render the Client Logout Button with styling */}
        <ClientLogoutButton />
      </div>
    )
  } else {
    redirect('/login')
  }
}


