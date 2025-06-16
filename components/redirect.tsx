"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
  }, [router]);

  return null;
}
