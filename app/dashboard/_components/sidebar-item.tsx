"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive =
    isMounted &&
    ((pathname === "/" && href === "/") ||
      pathname === href ||
      pathname?.startsWith(`${href}/`));

  const onClick = () => {
    router.push(href);
  };

  if (!isMounted) {
    return (
      <div className="w-full flex items-center gap-x-2 text-slate-600 text-sm font-medium pl-6 pr-4 py-2">
        <div className="flex items-center gap-x-3">
          <Icon size={22} className="text-slate-700" />
          <span>{label}</span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "w-full flex items-center gap-x-2 text-slate-600 text-sm font-medium pl-6 pr-4 py-2 transition-all hover:text-slate-700 hover:bg-slate-400/20",
        isActive &&
          "text-sky-800 bg-gray-400/20 hover:bg-gray-400/20 hover:text-sky-800"
      )}
    >
      <div className="flex items-center gap-x-3">
        <Icon
          size={22}
          className={cn("text-slate-700", isActive && "text-sky-900")}
        />
        <span>{label}</span>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-l-2 border-sky-900 h-6 transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
