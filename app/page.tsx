"use-client"

import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";

export default async function Home() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/login')
  } else {
    return (
      <div>
        <h1 className="text-4xl md:text-6xl font-bold py-auto px-auto">Welcome to SVNIT Hostel Section Website</h1>
      </div>
    );
  }
}
