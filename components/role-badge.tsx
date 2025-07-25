//insignia diferenciadora de roles
export function RoleBadge({ role }: { role: string | null }) {
  if (!role) return null;

  return (
    <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800">
      Rol: {role}
    </span>
  );
}
