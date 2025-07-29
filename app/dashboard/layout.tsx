import { Footer } from "../(main)/footer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

// export default function DashboardLayout ({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="h-screen flex flex-col">
//       <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
//          <Navbar/>
//        </div>
//       <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
//         <Sidebar />
//       </div>
//       <main className="md:pl-56 pt-[80px] flex-1 overflow-y-auto">
//       {children}
//       </main>
//     <div>
//       <Footer />
//      </div>
//     </div>
//   );
// }

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] flex-1 overflow-y-auto">
        {children}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}