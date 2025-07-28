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
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-300 px-4 bg-gray-200">
      <div className="mx-auto max-w-screen-xl flex items-center justify-between md:justify-around h-full">
        <div className="flex items-center gap-x-2 sm:gap-x-3 overflow-hidden">
          <Image
            src="/skahverse.png"
            alt="Logo Inicial"
            width={80}
            height={80}
            className="w-auto h-18 sm:h-18 md:h-20 lg:h-28"
            quality={100}
          />
          <div className="overflow-hidden">
            <h1 className="text-sm sm:text-xl md:text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
                SKAH
              </span>
              <span className="text-sky-800">verse</span>
            </h1>
            <div className="text-xs text-gray-700 truncate">
              Software, Knowledge, AI & Hardware
            </div>
          </div>
        </div>

        <ClerkLoading>
          <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <Button
                variant="cyberGradient"
                className="text-xs sm:text-sm px-2 sm:px-4 py-1"
              >
                <Link href="/dashboard">Ir al contenido</Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="neonPurple"
                className="text-xs sm:text-sm px-2 sm:px-4 py-1"
              >
                Inicia sesión
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
