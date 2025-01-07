import Image from "next/image";
import svnitLogo from "@/public/svnit-logo.png"
// import nameHindi from "@/public/namehindi.png"
import patelJi from "@/public/patelji.png"

export default async function Topbar() {
  return (
    <div className="flex w-full justify-between items-center px-10 mt-5 h-40 bg-black">
      <Image src={svnitLogo} alt="SVNIT Logo" height={64} />
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
      <Image src={patelJi} alt="Sardar Ji Photo" height={64} />
    </div>
  );
}

