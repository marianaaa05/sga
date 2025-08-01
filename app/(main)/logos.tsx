"use client";

import Image from "next/image";

export default function Logos() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-6">
        <Image
          src="/Kernel.png"
          width={120}
          height={120}
          className="w-32 h-32 object-contain drop-shadow-2xl"
          alt="Kernel"
        />
        <Image
          src="/sinapsis.png"
          width={120}
          height={120}
          className="w-32 h-32 object-contain drop-shadow-2xl"
          alt="Sinapsis"
        />
        <Image
          src="/Animus.png"
          width={120}
          height={120}
          className="w-32 h-32 object-contain drop-shadow-2xl"
          alt="Animus"
        />
      </div>
    </>
  );
}
