import { Footer } from "../(main)/footer";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ 
  children 
}: { children: React.ReactNode 

}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 flex-1 overflow-y-auto">
      {children}
      </main>
    <div>
      <Footer />
     </div>
    </div>
  );
}

export default DashboardLayout;