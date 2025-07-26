//insignia diferenciadora de roles
import { Button } from "@/components/ui/button";
export function RoleBadge({ role }: { role: string | null }) {
  if (!role) return null;

  return (
    <Button variant="outline" size="sm" className="text-xs px-2 py-1 rounded ">
      Rol: {role}
    </Button>
    // <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800">
    //   Rol: {role}
    // </span>
  );
}
