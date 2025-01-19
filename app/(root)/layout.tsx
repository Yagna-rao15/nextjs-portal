import React, { ReactNode } from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16">
      <div className="max-w-7xl px-4">
        <Header />
        <div>{children}</div>
      </div>
    </main>
  );
}
