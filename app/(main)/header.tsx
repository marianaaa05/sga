import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-300 px-4 bg-gray-200">
     <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
       <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">

       <Image
         src="/logo.webp"
         alt="Logo"
         height="70"
         width="70"
       />
       <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 tracking-wide">
         Learning Management System
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
          <Button variant="secondary">
            Inicia sesión o registrate
          </Button>
          </SignInButton>
       </SignedOut>
       </ClerkLoaded>
      </div>
      </header>
  );
}