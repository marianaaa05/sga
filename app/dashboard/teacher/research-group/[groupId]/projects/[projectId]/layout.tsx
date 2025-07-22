//subrutas
import React from "react";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
