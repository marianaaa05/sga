import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className="hidden lg:block w-full bg-gray-600"
    >
      <div
        className="max-w-screen mx-auto flex 
       items-center justify-center p-2"
      >
        <Button size="lg" variant="link">
          <Image src="/logo.svg" alt="" height={35} width={35} className="mr-3"></Image>
        </Button>

        <Button size="lg" variant="link">
          <Image src="/next.svg" alt="" height={70} width={70} className="mr-4"></Image>
        </Button>

        <Button size="lg" variant="link">
          <Image src="/globe.svg" alt="" height={50} width={50} className="mr-4"></Image>
        </Button>

        <Button size="lg" variant="link">
          <Link href="https://www.aunar.edu.co/" target="_blank" rel="noopener noreferrer">
          <Image src="/aunar.svg" alt="" height={40} width={40} className="mr-3"></Image>
          </Link>
        </Button>

        <Button size="lg" variant="link">
          <Image src="/logo_aunar.svg" alt="" height={200} width={200} className="mr-3"></Image>
        </Button>
      </div>
      <p className="w-full text-xs text-neutral-100 text-center p-2 bg-gray-700">
        © 2024 Semilleros de Investigación en Ingeniería Informática. Todos los
        derechos reservados.
      </p>
    </footer>
  );
};
