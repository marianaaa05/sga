/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{categoriesId: string}>;
}

export default async function CourseLayout({ children, params }: LayoutProps) {
  const { categoriesId } = await params;
  return (
    <div>
      {children}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ categoriesId: string }> }) {
  const { categoriesId } = await params;
  return {
    title: `Editando curso ${categoriesId}`,
  };
}