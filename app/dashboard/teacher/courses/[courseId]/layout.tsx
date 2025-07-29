// import { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   params: {
//     courseId: string;
//   };
// }

// export default function CourseLayout({ children }: LayoutProps) {
//   return (
//     <div>
//       {children}
//     </div>
//   );
// }

// export async function generateMetadata({ params }: { params: { courseId: string } }) {
//   return {
//     title: `Editando curso ${params.courseId}`,
//   };
// }


import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ courseId: string }>;
}

export default async function CourseLayout({ 
  children,
  params
}: LayoutProps) {
  // Esperar a que los parámetros se resuelvan
  const { courseId } = await params;
  
  return (
    <div className="p-6" data-course-id={courseId}>
      {children}
    </div>
  );
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ courseId: string }> 
}) {
  const { courseId } = await params;
  
  return {
    title: `Editando curso ${courseId}`,
  };
}