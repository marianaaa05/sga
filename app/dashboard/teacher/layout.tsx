// export default function TeacherLayout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>
// }


export default function TeacherLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}