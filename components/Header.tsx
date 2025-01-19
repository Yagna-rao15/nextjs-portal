"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="my-10 flex justify-between gap-5">
      <Link href="/">SVNIT</Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/hostels"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/hostels" ? "text-light-200" : "text-light-100"
            )}
          >
            Hostels
          </Link>
        </li>
      </ul>
    </div>
  );
}
