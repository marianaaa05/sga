"use client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { RoleBadge } from "@/components/role-badge";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;

  return (
    <div className="p-4 border-b h-full flex items-center justify-between border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 shadow-sm">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-2xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
              SKAH
            </span>
            <span className="text-sky-800">verse</span>
          </h1>

            <Link href="/">
              <Button
                variant="linkLms"
                className="text-xs sm:text-sm px-2 sm:px-4 py-1 text-sky-800 hover:text-sky-900"
              >
                Ir al inicio
              </Button>
            </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <RoleBadge role={role ?? null} />
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
