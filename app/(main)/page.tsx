import Image from "next/image";

// import Link from "next/link";
//  import { Code, Database, Server } from "lucide-react";
import ImageCarousel from "./carousel";
import VideoGrid from "./interviews";
import { Calendar1 } from "lucide-react";
// import VideoComponent from "@/components/video";

export default function Home() {
  return (
    <>
      {/* <div className="w-full h-full text-center p-6 md:p-8 lg:p-12">
         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100 mb-6">
           INNOVACIÓN EN TECNOLOGÍA
         </h1>
         <div className="flex justify-center gap-6 md:gap-8 text-white">
           <Code className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
           <Database className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
           <Server className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
         </div>
       </div> */}

      <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center justify-center p-6 gap-6 lg:gap-12">
        <div className="relative w-60 md:w-80 md:h-80 lg:w-130 lg:h-0 mb-6 lg:mb-0 flex flex-col items-center">
          {/* <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-100 text-center mb-4">
             Semilleros de Investigación
           </h2> */}
          <h2 className="text-4xl md:text-2xl lg:text-3xl font-extrabold text-center mb-4 text-fuchsia-100 drop-shadow-[0_0_10px_#ff00ff] drop-shadow-[2px_2px_10px_#000fff]">
            SEMILLEROS DE INVESTIGACIÓN: INGENIERÍA INFORMÁTICA AUNAR
          </h2>

          <div className="flex flex-row justify-center gap-6 lg:gap-8">
            <Image
              src="/Kernel.png"
              width={140}
              height={140}
              alt="Semillero de Investigación en Intelligence Artificial y Desarrollo de Software"
              className="object-contain drop-shadow-2xl"
            />
            <Image
              src="/sinapsis.png"
              width={90}
              height={90}
              alt="Semillero de Investigación en Robótica"
              className="object-contain drop-shadow-2xl"
            />
            <Image
              src="/animus.png"
              width={80}
              height={80}
              alt="Semillero de Cyber Seguridad  Animus Cracking"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
      {/* <VideoComponent /> */}

      {/*centra el texto*/}
      <div className="mb-8 mt-8">
        <div className="min-h w-full text-center  md:p-8 lg:p-25 lg:h-4">
          <h1 className="flex items-center justify-center gap-2 text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100 mb-6 mt-0 md:mt-20 p-0">
            <Calendar1 className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-12 text-purple-700" />
            EVENTOS
          </h1>
          {/* <div className="flex justify-center gap-6 md:gap-8 text-white">
            <Code className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
            <Database className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
            <Server className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </div> */}
        </div>
      </div>

      <ImageCarousel />
      <VideoGrid />

      {/* <section className="relative bg-gradient-to-br from-gray-600 via-gray-900 to-gray-950 py-20 px-6"></section> */}
      {/* <section className="relative bg-gradient-to-br from-gray-600 via-gray-900 to-gray-950 py-20 px-6"> */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-md">
          {/* <ContactRound className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-12 text-purple-700" /> */}
          ¿Quién está detrás de
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
            SKAH
          </span>
          <span className="text-white">verse</span>
        </h1>

        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/80 shadow-xl px-6 py-12 md:px-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-gray-300 via-gray-700 to-gray-300">
          {/* Imagen de perfil */}
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
            <img
              src="./foto.png"
              alt="Mariana Arredondo Ortiz"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="text-left text-white max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Mariana Arredondo Ortiz
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Soy estudiante de{" "}
              <span className="text-sky-500 font-medium">
                Ingeniería Informática
              </span>
              , creadora de SKAHverse. Este proyecto representa mi compromiso
              con la tecnología, la educación y el diseño funcional. Me apasiona
              crear experiencias visuales que generen valor.
            </p>
            <a
              href="https://miportafolio-mariana.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
            >
              Visita mi portafolio
            </a>
          </div>
        </div>
      </div>
      {/* </section> */}

      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-100 text-center mb-4">
        <br /> ¡Únete a nuestros semilleros y potencia tus habilidades en el
        mundo de la tecnología! <br></br>🧠👨‍💻👩‍💻
        <br />
        <br />
        Un universo de posibilidades espera por ti.💫
      </h2>
      {/* <div className="flex flex-col items-center p-8 gap-y-2 w-full">
         <ClerkLoading>
           <Loader className="h-5 w-5 text-muted-foreground animate-ping" />
         </ClerkLoading>
         <ClerkLoaded>
           <SignedOut>
             <SignIn />
           </SignedOut>
         </ClerkLoaded>
       </div> */}
    </>
  );
}
