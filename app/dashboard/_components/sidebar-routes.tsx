'use client'
 import { TextSearch, NotebookText, GraduationCap, ChartColumnIncreasing, Tags } from "lucide-react";
 import { SidebarItem } from "./sidebar-item"
 import { usePathname } from "next/navigation";

 const guestRoutes = [
   {
     icon: NotebookText,
     label: "Centro de Control",
     href: "/dashboard"
   },
   {
     icon: TextSearch,
     label: "Explorador",
     href: "/dashboard/search"
   }
 ]

 const teacherRoutes = [
  {
    icon: GraduationCap,
    label: "Cursos",
    href: "/dashboard/teacher/courses"
  },
  {
    icon: Tags,
    label: "Categorías",
    href: "/dashboard/teacher/categories"
  },
  {
    icon: ChartColumnIncreasing,
    label: "Analíticas",
    href: "/dashboard/teacher/analytics"
  },
]
 
 export const SidebarRoutes = () => {
   const pathname = usePathname();
   const isTeacherPage = pathname?.includes("/dashboard/teacher");
   const routes = isTeacherPage ? teacherRoutes : guestRoutes

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
       <h1 className="text-center">Demos de usuarios</h1>
     </div>
   )
 }