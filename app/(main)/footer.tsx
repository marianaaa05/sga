import { Button } from "@/components/ui/button";
 import Image from "next/image";
 import Link from "next/link";
 
 export const Footer = () => {
   return ( 
     <footer className="hidden lg:block h-20 w-full bg-sky-700">
       <div className="max-w-screen-lg mx-auto flex items-center justify-between h-full">
         <Button size="lg" variant="link" className="">
           <Link
             href={"https://www.aunar.edu.co/"}
             target="_blank"
             rel="noopener noreferrer"
           >
           <Image
             src="/logo.webp"
             alt=""
             height={60}
             width={60}
             className="mr-4 rounded-md"
           />
           </Link>
         </Button>
         <Button size="lg" variant="link" className="">
           <Image
             src="/logo_aunar.svg"
             alt=""
             height={200}
             width={200}
             className="mr-4 rounded-md"
           />
         </Button>
         <Button size="lg" variant="link" className="">
           <Image
             src="/logo.svg"
             alt=""
             height={50}
             width={50}
             className="mr-4 rounded-md"
           />
         </Button>
         <Button size="lg" variant="link" className="">
           <Image
             src="/next.svg"
             alt=""
             height={70}
             width={70}
             className="mr-4 rounded-md"
           />
         </Button>
         <Button size="lg" variant="link" className="">
           <Image
             src="/vercel.svg"
             alt=""
             height={70}
             width={70}
             className="mr-4 rounded-md"
           />
         </Button>
       </div>
       <p className="w-full text-xs text-neutral-100 bg-sky-700 items-center text-center p-2">
           © 2024 Semillero de Investigación en Ingeniería Informática. Todos los derechos reservados.
         </p>
     </footer>
    );
 }