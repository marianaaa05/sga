"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

export const NavbarRoutes = () => {
  const [isClient, setIsClient] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Asegura que esto solo se ejecute en el cliente
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/"); // Redirige a la página de inicio después de cerrar sesión
  };

  if (!isClient) return null; // Evita renderizado en el servidor

  return (
    <div className="flex gap-x-2 ml-auto items-center text-sky-800">
      <Button size="sm" variant="ghostLms" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-1" />
        Cerrar sesión
      </Button>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
