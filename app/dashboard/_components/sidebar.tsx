import Logo from "./logo";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="p-4 mt-auto flex flex-col items-end">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <p className="text-xs">
          Hecho con ❤️ por{" "}
          <a
            href="https://www.aunar.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mariana Arredondo Ortiz
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
