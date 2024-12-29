"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function GotoForms() {
  const router = useRouter();

  const handleGotoForms = async () => {
    try { router.push("/form") }
    catch (err) {
      console.error('Redirect Failed', err)
    }
  }

  return (
    <Button onClick={handleGotoForms} className="mt-4">
      Goto Forms
    </Button>
  )
}

