import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 shadow-sm">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-2xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] bg-clip-text text-transparent">
            SKAH
          </span>
          <span className="text-sky-800">verse</span>
        </h1>
      </div>

      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
