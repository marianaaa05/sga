"use client";
 
 import { UserButton } from "@clerk/nextjs";
 import { usePathname, useRouter } from "next/navigation";
 import { Button } from "./button";
 import { LogOut } from "lucide-react";
 import Link from "next/link";
 
 
 export const NavbarRoutes = () => {
   const pathname = usePathname();
   const router = useRouter();
 
   const isTeacherPage = pathname?.startsWith("/teacher");
   const isStudentPage = pathname?.includes("/chapter");
 
   return (
     <div className="flex gap-x-2 ml-auto">
       {isTeacherPage || isStudentPage ? (
         <Button>
           <LogOut className="w-4 h-4 mr-1" />
         </Button>
       ):(
         <Link href={"/teacher/courses"}>
           <Button variant={"linkLms"} size="sm">
             INSTRUCTOR
           </Button>
         </Link>
       )}
       <UserButton/>
     </div>
   );
 };