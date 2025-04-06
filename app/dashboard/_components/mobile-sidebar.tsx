 import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
 import { Logs } from "lucide-react";
 import Sidebar from "./sidebar";
 
 export const MobileSidebar = () => {
   return(
     <Sheet>
       <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
       <Logs className="w-7 h-7 text-slate-500 hover:text-slate-800"/>
       </SheetTrigger>
       <SheetContent side= "left" className="p-0 bg-white">
         <Sidebar/>
       </SheetContent>
     </Sheet>
   )
 }