import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

export default async function AttachmentsLayout({ 
  children,
  params
}: LayoutProps) {
  // Esperar a que los parámetros se resuelvan
  const { courseId } = await params;

  return (
    <div className="bg-white min-h-screen" data-course-id={courseId}>
      {children}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  
  return {
    title: `Archivos del curso ${courseId}`,
  };
}