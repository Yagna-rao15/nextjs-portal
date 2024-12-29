
import React from 'react';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex items-center justify-between p-4 bg-black">
        <div className="flex-shrink-0">
          <Image
            src={"/svnit-logo.png"}
            className="h-16 w-auto"
            alt="SVNIT Logo"
            width={128}
            height={128}
          />
        </div>
        <div className="text-center flex-grow">
          <h2 className="text-white text-4xl font-semibold">Sardar Vallabhbhai</h2>
          <h3 className="text-white text-xl">National Institute of Technology</h3>
        </div>
      </div>

      <div className="container mx-auto p-4 flex justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}

