import { Button } from "@/components/ui/button";
 import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
 import { Loader } from "lucide-react";
 // import { AppProps } from "next/app";  || { Component, pageProps }: AppProps
 import Image from "next/image";
 
 export const Header = () => {
   return (
     <header className="h-20 w-full border-b-2 border-slate-300 px-4 bg-gray-200">
       <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
         <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
           <Image
             src="/logo.webp"
             alt="Logo Inicial"
             width="60"
             height="60"
           />
           <h1 className="text-sm sm:text-xl md:text-xl lg:text-2xl font-extrabold text-gray-800 tracking-wide">
             Learning Manager System
           </h1>
         </div>
         <ClerkLoading>
           <Loader className="h-8 w-8 text-muted-foreground animate-spin"/>
         </ClerkLoading>
         <ClerkLoaded>
           <SignedIn>
             <UserButton/>
           </SignedIn>
           <SignedOut>
             <SignInButton
               mode="modal"
             >
               {/* <Component {...pageProps}/> */}
               <Button variant="secondary" className="text-sm">
                 Inicia sesión o registrarte
               </Button>
             </SignInButton>
           </SignedOut>
         </ClerkLoaded>
       </div>
     </header>
     );
 }