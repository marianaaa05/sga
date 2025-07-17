import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

export default function AttachmentsLayout({ children }: LayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      {children}
    </div>
  );
}

export function generateMetadata({
  params,
}: {
  params: { courseId: string };
}) {
  return {
    title: `Archivos del curso ${params.courseId}`,
  };
}
