import React from 'react';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-black mx-auto">
      <div className="max-w-screen-lg mx-auto p-4 flex items-center justify-between bg-black">
        {/* Left image */}
        <div className="flex-shrink-0 max-w-full lg:max-w-screen-lg">
          <Image
            src={"/svnit-logo.png"}
            className="h-16 w-auto"
            alt="SVNIT Logo"
            width={128}
            height={128}
          />
        </div>

        {/* Center text */}
        <div className="text-center flex-grow">
          {/* Desktop version - Hidden on mobile */}
          <div className="hidden sm:block">
            <h2 className="text-white text-4xl font-semibold">Sardar Vallabhbhai</h2>
            <h3 className="text-white text-xl">National Institute of Technology</h3>
          </div>

          {/* Mobile version - Hidden on desktop */}
          <div className="sm:hidden">
            <h2 className="text-white text-5xl font-bold">SVNIT</h2>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-shrink-0 max-w-full lg:max-w-screen-lg">
          <Image
            src={"/patelji.png"}
            className="h-16 w-auto"
            alt="SVNIT Logo"
            width={128}
            height={128}
          />
        </div>
      </div>

      {children}
    </div>
  );
}

