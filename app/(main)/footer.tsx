import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    // <footer className="hidden lg:block w-full bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400">
    <footer className="w-full border-t bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center lg:justify-end gap-4 lg:gap-28 px-4 lg:px-20 lg:pl-32 py-4">
        <Button size="lg" variant="link" className="p-0">
          <Image
            src="/skahverse.png"
            alt="Semillero de Inteligencia Artificial y Desarrollo de Software"
            height={70}
            width={70}
            className="object-contain"
          />
        </Button>

        <Button size="lg" variant="link" className="p-0">
          <Image
            src="/Kernel.png"
            alt="Semillero de Inteligencia Artificial y Desarrollo de Software"
            height={70}
            width={70}
            className="object-contain"
          />
        </Button>

        <Button size="lg" variant="link" className="p-0">
          <Image
            src="/Animus.png"
            alt="Semillero de ciberseguridad"
            height={50}
            width={50}
            className="object-contain"
          />
        </Button>

        <Button size="lg" variant="link" className="p-0">
          <Image
            src="/sinapsis.png"
            alt="Semillero de Investigación en Robótica"
            height={50}
            width={50}
            className="object-contain"
          />
        </Button>

        <Button size="lg" variant="link" className="hidden sm:flex p-0">
          <Link
            href="https://www.aunar.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/aunar.svg"
              alt="Corporación Universitaria Autónoma de Nariño"
              height={45}
              width={45}
              className="object-contain"
            />
          </Link>
        </Button>

        <Button size="lg" variant="link" className="hidden sm:flex p-0">
          <Image
            src="/logo_aunar.svg"
            alt="Logo AUNAR"
            height={130}
            width={120}
            className="object-contain"
          />
        </Button>
      </div>

      <p className="w-full text-xs text-center text-slate-700 p-2 lg:w-full mx-auto items-center justify-between h-full border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 shadow-sm">
        © 2025 Semilleros de Investigación en Ingeniería Informática. Todos los
        derechos reservados.
      </p>
    </footer>
  );
};
