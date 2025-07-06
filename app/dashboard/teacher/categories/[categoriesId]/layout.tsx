import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: {
    courseId: string;
  };
}

export default function CourseLayout({ children }: LayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}

export async function generateMetadata({ params }: { params: { courseId: string } }) {
  return {
    title: `Editando curso ${params.courseId}`,
  };
}