// 'use client'
//  import { TextSearch, NotebookText, GraduationCap, ChartColumnIncreasing, Tags, LibraryBig, Users } from "lucide-react";
//  import { SidebarItem } from "./sidebar-item"
//  import { usePathname } from "next/navigation";

//  const guestRoutes = [
//    {
//      icon: NotebookText,
//      label: "Centro de Control",
//      href: "/dashboard"
//    },
//    {
//      icon: TextSearch,
//      label: "Explorador",
//      href: "/dashboard/search"
//    }
//  ]

//  const teacherRoutes = [
//   {
//     icon: Users,
//     label: "Grupos de Investigación",
//     href: "/dashboard/teacher/research-group"
//   },
//   {
//     icon: GraduationCap,
//     label: "Cursos",
//     href: "/dashboard/teacher/courses"
//   },
//   {
//     icon: Tags,
//     label: "Categorías",
//     href: "/dashboard/teacher/categories"
//   },
//   {
//     icon: LibraryBig,
//     label: "Contenidos",
//     href: "/dashboard/teacher/attachments"
//   },
//   {
//     icon: ChartColumnIncreasing,
//     label: "Analíticas",
//     href: "/dashboard/teacher/analytics"
//   },
  
  

// ]
 
//  export const SidebarRoutes = () => {
//    const pathname = usePathname();
//    const isTeacherPage = pathname?.includes("/dashboard/teacher");
//    const routes = isTeacherPage ? teacherRoutes : guestRoutes

//    return(
//      <div className="flex flex-col w-full">
//        {routes.map((route) => (
//          <SidebarItem
//            key={route.href}
//            icon={route.icon}
//            label={route.label}
//            href={route.href}
//          />
//        ))}
//        {/* <h1 className="text-center">Demos de usuarios</h1> */}
//      </div>
//    )
//  }


'use client'

import {
  TextSearch,
  NotebookText,
  GraduationCap,
  ChartColumnIncreasing,
  Tags,
  LibraryBig,
  Users
} from "lucide-react";
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

const researchGroupRoutes = [
  {
    icon: Users,
    label: "Grupos de Investigación",
    href: "/dashboard/teacher/research-group"
  }
]

const courseRoutes = [
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
    icon: LibraryBig,
    label: "Contenidos",
    href: "/dashboard/teacher/attachments"
  },
]

const analyticsRoute = [
  {
    icon: ChartColumnIncreasing,
    label: "Analíticas",
    href: "/dashboard/teacher/analytics"
  }
]

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/dashboard/teacher");

  if (!isTeacherPage) {
    return (
      <div className="flex flex-col w-full">
        {guestRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-xs font-semibold text-slate-500 px-4 pt-4 pb-2">Semilleros de investigación</p>
      {researchGroupRoutes.map((route) => (
        <SidebarItem key={route.href} {...route} />
      ))}

      <p className="text-xs font-semibold text-slate-500 px-4 pt-4 pb-2">Cursos</p>
      {courseRoutes.map((route) => (
        <SidebarItem key={route.href} {...route} />
      ))}

      <p className="text-xs font-semibold text-slate-500 px-4 pt-4 pb-2">Otros</p>
      {analyticsRoute.map((route) => (
        <SidebarItem key={route.href} {...route} />
      ))}
    </div>
  )
}
