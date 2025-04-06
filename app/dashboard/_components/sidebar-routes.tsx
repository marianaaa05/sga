'use client'
import { TextSearch, NotebookText } from "lucide-react"
 import { SidebarItem } from "./sidebar-item"
 
 const guestRoutes = [
   {
     icon: NotebookText,
     label: "Centro de Control",
     href: "/"
   },
   {
     icon: TextSearch,
     label: "Browse",
     href: "/search"
   }
 ]
 
 export const SidebarRoutes = () => {
   const routes = guestRoutes
   return(
     <div className="flex flex-col w-full">
       {routes.map((route) => (
         <SidebarItem
           key={route.href}
           icon={route.icon}
           label={route.label}
           href={route.href}
         />
       ))}
       Group Labs
     </div>
   )
 }