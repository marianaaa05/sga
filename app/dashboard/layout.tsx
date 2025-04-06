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
      <div className= "flex-1 ml-56">
      {children}
    </div>
    <div>
      <Footer />
     </div>
    </div>
  );
}

export default DashboardLayout;