"use client";

import React from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 md:px-10 w-full bg-background text-foreground relative">
      {/* Mode Toggle */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md">
        <div
          className="p-6 md:p-8 bg-card text-card-foreground border rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4"
          id="root"
        >
          <header className="space-y-2">
            <Image
              src="/svnit-logo.png"
              className="mx-auto mb-4"
              alt="SVNIT Logo"
              width={128}
              height={128}
              priority
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              SVNIT SURAT
            </h1>
            <p className="text-lg md:text-xl font-medium text-muted-foreground">
              Hostel Section
            </p>
          </header>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

