/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";

interface ProjectLayoutProps {
  children: ReactNode;
  params: Promise<{ projectId: string; groupId: string }>;
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { projectId, groupId } = await params;
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

