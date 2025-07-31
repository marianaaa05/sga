/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ courseId: string }>;
}

export default async function CourseLayout({ children, params }: LayoutProps) {
  const { courseId } = await params;
  return (
    <div>
      {children}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return {
    title: `Editando curso ${courseId}`,
  };
}


