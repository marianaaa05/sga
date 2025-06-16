import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="hidden lg:block w-full bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400">
      <div
        className="max-w-screen mx-auto flex 
       items-center justify-center p-2"
      >
        <Button size="lg" variant="link">
          <Image
            src="/Kernel.png"
            alt="Semillero de Inteligencia Artificial y Desarrollo de Software"
            height={100}
            width={100}
            className="mr-4 mt-3"
          ></Image>
        </Button>

        <Button size="lg" variant="link">
          <Image
            src="/Animus.png"
            alt="Semillero de ciberseguridad"
            height={50}
            width={50}
            className="mr-3"
          ></Image>
        </Button>

        <Button size="lg" variant="link">
          <Image
            src="/sinapsis.png"
            alt="Semillero de Investigación en Robótica"
            height={50}
            width={50}
            className="mr-4 inset-shadow-black"
          ></Image>
        </Button>

        <Button size="lg" variant="link">
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
              className="mr-3"
            ></Image>
          </Link>
        </Button>

        <Button size="lg" variant="link">
          <Image
            src="/logo_aunar.svg"
            alt=""
            height={200}
            width={200}
            className="mr-3"
          ></Image>
        </Button>
      </div>
      <p className="w-full text-xs text-neutral-100 text-center p-2 bg-gradient-to-r from-gray-500 via-gray-900 to-gray-500">
        © 2025 Semilleros de Investigación en Ingeniería Informática. Todos los
        derechos reservados.
      </p>
    </footer>
  );
};
