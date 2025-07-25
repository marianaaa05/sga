import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";

type Entity = "course" | "researchGroup";

export function useMembershipRole(entity: Entity, entityId: string) {
  const { user } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || !entityId) return;

    axios
      .get(`/api/membership/role`, {
        params: {
          entity,
          entityId,
        },
      })
      .then((res) => setRole(res.data.role))
      .catch(() => setRole(null));
  }, [user?.id, entity, entityId]);

  return role;
}
