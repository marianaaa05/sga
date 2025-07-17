"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface FormProps {
  initialData: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
  };
}

export function FormResearchGroup({ initialData }: FormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/research-group/${initialData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, imageUrl }),
      });

      if (!res.ok) throw new Error("Error al actualizar el semillero");

      toast.success("Semillero actualizado correctamente");
      router.refresh(); 
    } catch (err) {
      toast.error("Ocurrió un error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nombre del semillero"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Descripción del semillero"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="URL de la imagen (opcional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
