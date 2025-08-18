"use client";

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Logs } from "lucide-react";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  return(
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Logs className="w-7 h-7 text-slate-500 hover:text-slate-800"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SheetTitle>
          <VisuallyHidden>Menú de Navegación</VisuallyHidden>
        </SheetTitle>
        <Sidebar/>
      </SheetContent>
    </Sheet>
  )
}