'use client';

import {
  GraduationCap,
  // ChartColumnIncreasing,
  Tags,
  LibraryBig,
  Users,
  BadgeInfo,
  Video,
  LocateIcon,
} from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { useUser } from '@clerk/nextjs';

type Role = 'STUDENT' | 'TEACHER' | 'WEB_MASTER';

const researchGroupRoutes = [
  { icon: Users, label: 'Semilleros', href: '/dashboard/teacher/research-group' },
];

const courseRoutes = [
  { icon: GraduationCap, label: 'Cursos', href: '/dashboard/teacher/courses' },
];

const courseOtherRoutes = [
  { icon: LibraryBig, label: 'Contenidos', href: '/dashboard/teacher/attachments' },
];

const analyticsRoutes = [
  { icon: Tags, label: 'Categorías', href: '/dashboard/teacher/categories' },
  // { icon: ChartColumnIncreasing, label: 'Analíticas', href: '/dashboard/teacher/analytics' },
];

// 📌 Nuevas rutas accesibles para todos
const publicRoutes = [
  { icon: BadgeInfo, label: '¿Quiénes somos?', href: '/#about' },
  { icon: Video, label: 'Entrevistas', href: '/#interviews' },
  { icon: LocateIcon, label: 'Eventos', href: '/#events' },
];

export const SidebarRoutes = () => {
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as Role) ?? 'STUDENT';

  const routes: Array<typeof researchGroupRoutes[0] | { divider: string }> = [];

  // Rutas por rol
  if (role === 'STUDENT') {
    routes.push({ divider: 'Semilleros de Investigación' });
    routes.push(...researchGroupRoutes);
    routes.push({ divider: 'Cursos' });
    routes.push(...courseRoutes);
  }

  if (role === 'TEACHER' || role === 'WEB_MASTER') {
    routes.push({ divider: 'Semilleros de Investigación' });
    routes.push(...researchGroupRoutes);
    routes.push({ divider: 'Cursos' });
    routes.push(...courseRoutes);
    routes.push(...courseOtherRoutes);
    routes.push({ divider: 'Otros' });
    routes.push(...analyticsRoutes);
  }

  routes.push({ divider: 'Explorar' });
  routes.push(...publicRoutes);

  return (
    <div className="flex flex-col w-full">
      {routes.map((r, idx) =>
        'divider' in r ? (
          <p
            key={`div-${idx}`}
            className="text-xs font-semibold text-slate-500 px-4 pt-4 pb-2"
          >
            {r.divider}
          </p>
        ) : (
          <SidebarItem key={r.href} icon={r.icon} label={r.label} href={r.href} />
        )
      )}
    </div>
  );
};
