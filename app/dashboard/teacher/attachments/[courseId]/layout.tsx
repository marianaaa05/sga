// import { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   params: {
//     courseId: string;
//   };
// }

// export default function AttachmentsLayout({ children }: LayoutProps) {
//   return (
//     <div className="bg-white min-h-screen">
//       {children}
//     </div>
//   );
// }

// export function generateMetadata({
//   params,
// }: {
//   params: { courseId: string };
// }) {
//   return {
//     title: `Archivos del curso ${params.courseId}`,
//   };
// }


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