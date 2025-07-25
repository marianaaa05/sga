"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Check } from "lucide-react";
import axios from "axios";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface JoinButtonProps {
  entity: string;
  id: string;
  isMember: boolean;
  className?: string;
}

export const JoinButton: React.FC<JoinButtonProps> = ({
  entity,
  id,
  isMember,
  className,
}) => {
  const [loading, setLoading] = React.useState(false);
   const router = useRouter();

    const handleJoin = async () => {
    setLoading(true);
    try {
      await axios.post("/api/membership", {
        ...(entity === "course"
          ? { courseId: id }
          : { researchGroupId: id }),
      });
      router.refresh();
      alert("¡Te has unido!🤓");
    } catch {
      alert("Ha ocurrido un error al unirte. 😕");
    } finally {
      setLoading(false);
    }
  };

  if (isMember) {
    return (
      <Button
        disabled
        variant="outline"
        size="sm"
        className={className}
      >
        <Check className="mr-2 w-4 h-4" />
        Miembro
      </Button>
    );
  }

  return (
    <Button
      onClick={handleJoin}
      disabled={loading}
      variant="cyberGradient"
      size="sm"
      className={className}
    >
      <UserPlus className="mr-2 w-4 h-4" />
      {loading
        ? "Uniéndome…"
        : `Unirse al ${entity === "researchGroup" ? "semillero" : "curso"}`}
    </Button>
  );
};
