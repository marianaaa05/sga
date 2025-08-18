export default function SkahverseLayout({ 
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