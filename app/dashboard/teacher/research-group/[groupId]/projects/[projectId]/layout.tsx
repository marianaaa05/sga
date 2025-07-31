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


// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
//   params: Promise<{ courseId: string }>;
// }

// export default async function CourseLayout({ children, params }: LayoutProps) {
//   const { courseId } = await params;
//   return (
//     <div>
//       {children}
//     </div>
//   );
// }

// export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
//   const { courseId } = await params;
//   return {
//     title: `Editando curso ${courseId}`,
//   };
// }


