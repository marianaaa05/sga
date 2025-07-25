'use client';

// import { UserButton, useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

// type Role = 'STUDENT' | 'TEACHER' | 'WEB_MASTER';

export const NavbarRoutes = () => {
  // const { user } = useUser();
  const pathname = usePathname();
  // const role = (user?.publicMetadata?.role as Role) ?? 'STUDENT';

  const inDashboard = pathname.startsWith('/dashboard');
  // const inTeacherSection = pathname.startsWith('/dashboard/teacher');

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      {inDashboard && (
        <Link href="/dashboard">
          <Button size="sm" variant="ghostLms">
            <LogOut className="h-4 w-4 mr-1" />
            Salir
          </Button>
        </Link>
      )}

      {/* {!inTeacherSection && role === 'STUDENT' && (
        <Link href="/dashboard/teacher/research-group">
          <Button size="sm" variant="ghostLms">
            INSTRUCTOR
          </Button>
        </Link>
      )} */}

      <UserButton />
    </div>
  );
};
