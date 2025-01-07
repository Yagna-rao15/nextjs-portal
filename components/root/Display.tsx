"use-client"

import Image from "next/image";
import swamy from "@/public/swamy-cropped.jpg";

export default function Display() {
  // const { width, height } = swamy;
  // const _width = width * 700 / height;
  // const x = (window.innerWidth - _width) / 2

  return (
    <div className="relative w-full w-auto h-[700px] overflow-hidden bg-black">
      <div className="absolute top-0 left-{x} right-0 h-[20%] bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute left-{x} top-0 bottom-0 w-[20%] bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute left-{x+_width} top-0 bottom-0 w-[20%] bg-gradient-to-l from-black to-transparent"></div>
      <Image src={swamy} alt="Hostel Picture" priority height={700} className="object-cover mx-auto" />
    </div>
  );
}
