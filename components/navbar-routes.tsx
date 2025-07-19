"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const role = user?.publicMetadata?.role;
  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isStudentPage = pathname?.includes("/chapter");

  return (
    // <div className="flex gap-x-1 ml-auto">
    //   {isTeacherPage || isStudentPage ? (
    //     <Link href="/dashboard">
    //       <Button size="sm" variant="ghostLms">
    //         <LogOut className="h-4 w-4 mr-1" />
    //         Salir
    //       </Button>
    //     </Link>
    //   ) : (
    //     <Link href={"/dashboard/teacher/courses"}>
    //       <Button className="text-xs items-end" variant="ghostLms">
    //         INSTRUCTOR
    //       </Button>
    //     </Link>
    //   )}
    //   <UserButton />
    // </div>
    <div className="flex gap-x-1 ml-auto">
      {(isTeacherPage || isStudentPage) ? (
        <Link href="/dashboard">
          <Button size="sm" variant="ghostLms">
            <LogOut className="h-4 w-4 mr-1" />
            Salir
          </Button>
        </Link>
      ) : role !== "TEACHER" ? ( 
        <Link href={"/dashboard/teacher/research-group"}>
          <Button className="text-xs items-end" variant="ghostLms">
            INSTRUCTOR
          </Button>
        </Link>
      ) : null}

      <UserButton />
    </div>
  );
};

