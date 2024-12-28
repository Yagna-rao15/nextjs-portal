import React from 'react';
import Image from 'next/image';

export default function Layout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-[28rem]" id="root">
      <header>
        <Image
          src="/svnit-logo.png"
          className="logo h-12em mx-auto mb-4"
          alt="SVNIT Logo"
          width={256} height={256}
        />
        <h1 className="text-black font-bold text-4xl md:text-5xl">
          <strong>SVNIT SURAT</strong>
        </h1>
        <p className="text-black font-bold text-2xl md:text-3xl">
          <strong>Hostel Section</strong>
        </p>
        <div className='flex items-center'>
          {children}
        </div>
      </header>
    </div>

  );
}

