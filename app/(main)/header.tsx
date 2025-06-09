import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
// import { AppProps } from "next/app";  || { Component, pageProps }: AppProps
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-300 px-4 bg-gray-200">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/askverse-1.png" alt="Logo Inicial" width="120" height="100" quality={100} />
          <div>
            <h1 className="text-sm sm:text-xl md:text-2xl lg:text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
                ASK
              </span>
              <span className="text-sky-800">verse</span>
            </h1>

            <div className="text-xs text-gray-700">
              Artificial Intelligence, Software & Knowledge
            </div>
          </div>
        </div>
        <ClerkLoading>
          <Loader className="h-8 w-8 text-muted-foreground animate-spin" />
        </ClerkLoading>
        {/* <ClerkLoaded> */}
        {/* <SignedIn> */}
        {/* <UserButton/> */}
        {/* </SignedIn> */}
        {/* <SignedOut> */}
        {/* <SignInButton */}
        {/* mode="modal" */}
        {/* > */}
        {/* <Component {...pageProps}/> */}
        {/* <Button variant="secondary" className="text-sm"> */}
        {/* </Button> */}
        {/* </SignInButton> */}
        {/* </SignedOut> */}
        {/* </ClerkLoaded> */}

        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Button variant="cyberGradient" className="text-sm">
                <Link href={"/dashboard"}>Ir al contenido</Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="secondaryLms" className="text-sm">
                Inicia sesión o registrarte
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
