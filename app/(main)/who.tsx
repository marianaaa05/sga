"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Who() {
  return (
    <div className="w-full max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-10">
      <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-white mb-1 drop-shadow-md">
        ¿Quién está detrás de
      </h2>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide mb-8">
        <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
          SKAH
        </span>
        <span className="text-white">verse?</span>
      </h1>

      <div className="relative w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/80 shadow-xl px-6 py-10 md:py-12 md:px-12 flex flex-col md:flex-row items-center md:items-start gap-8 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl shrink-0">
          <Image
            src="/foto-mariana.png"
            alt="Mariana Arredondo Ortiz"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-left max-w-xl w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">
            Mariana Arredondo Ortiz
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Soy estudiante de{" "}
            <span className="text-sky-800 font-medium dark:text-white">
              Ingeniería Informática
            </span>
            , creadora de SKAHverse. Este proyecto representa mi compromiso con
            la tecnología, la educación y el diseño funcional. Me apasiona crear
            experiencias visuales que generen valor.
          </p>
          <a
            href="https://miportafolio-mariana.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="neonPurple" className="text-sm">
              Visita mi portafolio
            </Button>
          </a> 
        </div>
      </div>
    </div>
  );
}
