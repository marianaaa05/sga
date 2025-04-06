"use client";
 
 import { cn } from "@/lib/utils";
 import { LucideIcon } from "lucide-react";
 import { usePathname, useRouter } from "next/navigation";
 
 interface SidebarItemProps {
   icon: LucideIcon;
   label: string;
   href: string;
 }
 
 export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
   const pathname = usePathname();
   const router = useRouter();
 
   // La variable isActive indica si la ruta actual coincide con la ruta proporcionada (href).
   // Se comprueba si la ruta actual es la raíz ("/") y si la ruta proporcionada también es la raíz ("/"),
   // o si la ruta actual es igual a la ruta proporcionada, o si la ruta actual comienza con la ruta proporcionada seguida de un slash ("/").
   const isActive =
     (pathname === "/" && href === "/") ||
     pathname === href ||
     pathname?.startsWith(`${href}/`);
 
   const onClick = () => {
     router.push(href)
   }
 
   return(
     <button
       onClick={onClick}
       type="button"
       className={cn(
         "flex items-center gap-x-2 text-slate-600 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-400/20",
         isActive && "text-sky-800 bg-sky-400/20 hover:bg-sky-400/20 hover:text-sky-800"
       )}
     >
       <div className="flex items-center gap-x-2 py-4">
         <Icon
           size={22}
           className={cn("text-slate-700", isActive && "text-sky-900")}
         />
         {label}
       </div>
       <div
         className={cn(
           "ml-auto opacity-0 border-x border-sky-900 h-full transition-all", isActive && "opacity-100"
         )}
       />
     </button>
   )
 };