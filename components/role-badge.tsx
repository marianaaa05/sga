"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function RoleBadge({ role }: { role: string | null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !role) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs text-sky-800 px-2 py-1 rounded"
    >
      Rol: {role}
    </Button>
  );
}
