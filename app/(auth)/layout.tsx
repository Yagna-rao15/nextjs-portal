"use client";
import React from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/DarkMode";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen justify-center items-center p-6 md:p-10 w-full bg-white dark:bg-zinc-950 text-zinc-950 dark:text-gray-500 relative">
      {/* Mode Toggle */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div
          className="mx-auto p-6 lg:p-3 bg-white dark:bg-zinc-950 rounded-xl shadow-md border-10 dark:border-l-white  dark:shadow-zinc-900 flex flex-col items-center text-center"
          id="root"
        >
          <header>
            <Image
              src="/svnit-logo.png"
              className="logo mx-auto mb-6"
              alt="SVNIT Logo"
              width={256}
              height={256}
            />
            <h1 className="text-zinc-950 dark:text-gray-100 font-bold text-4xl md:text-5xl mb-4">
              <strong>SVNIT SURAT</strong>
            </h1>
            <p className="text-zinc-950 dark:text-gray-300 font-bold text-2xl md:text-3xl mb-6">
              <strong>Hostel Section</strong>
            </p>
          </header>
          <div className="flex flex-col items-center w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
