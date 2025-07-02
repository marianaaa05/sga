"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isStudentPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-1 ml-auto">
      {isTeacherPage || isStudentPage ? (
        <Link href="/dashboard">
          <Button size="sm" variant="ghostLms">
            <LogOut className="h-4 w-4 mr-1" />
            Salir
          </Button>
        </Link>
      ) : (
        <Link href={"/dashboard/teacher/courses"}>
          <Button className="text-xs items-end" variant="ghostLms">
            INSTRUCTOR
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};
