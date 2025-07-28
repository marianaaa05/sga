"use client";

import Logo from "./logo";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Solo se activa en el cliente
    setIsClient(true);
  }, []);

  return (
    <div className="h-full border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <SidebarRoutes />
      </div>

      <div className="p-4 mt-auto flex flex-col items-end">
        {isClient && (
          <>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              {/* <UserButton afterSignOutUrl="/" /> */}
            </ClerkLoaded>
          </>
        )}

        <p className="text-xs">
          Hecho con ❤️ por{" "}
          <a
            href="https://www.aunar.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mariana Arredondo Ortiz
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
