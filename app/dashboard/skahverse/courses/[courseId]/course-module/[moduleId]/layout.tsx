import React from "react";

interface ModuleLayoutProps {
  children: React.ReactNode;
}

const ModuleLayout = ({ children }: ModuleLayoutProps) => {
  return <>{children}</>;
};

export default ModuleLayout;
