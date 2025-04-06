import Image from "next/image";
 // import Link from "next/link";
 import { Code, Database, Server } from "lucide-react";
 // import VideoComponent from "@/components/video";
 
 export default function Home() {
   return (
     <>
       <div className="w-full h-full text-center p-6 md:p-8 lg:p-12">
         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100 mb-6">
           INNOVACIÓN EN TECNOLOGÍA
         </h1>
         <div className="flex justify-center gap-6 md:gap-8 text-white">
           <Code className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
           <Database className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
           <Server className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
         </div>
       </div>
 
       <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center justify-center p-6 gap-6 lg:gap-12">
         <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-6 lg:mb-0 flex flex-col items-center">
           <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-100 text-center mb-4">
             Semilleros de Investigación
           </h2>
           <div className="flex flex-row justify-center gap-6 lg:gap-8">
             <Image
               src="/next.svg"
               width={100}
               height={100}
               alt="Logo 1"
               className="object-contain"
             />
             <Image
               src="/next.svg"
               width={100}
               height={100}
               alt="Logo 2"
               className="object-contain"
             />
             <Image
               src="/next.svg"
               width={100}
               height={100}
               alt="Logo 3"
               className="object-contain"
             />
           </div>
         </div>
       </div>
       {/* <VideoComponent /> */}
       <div className="mb-8 mt-8">
 
       </div>
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