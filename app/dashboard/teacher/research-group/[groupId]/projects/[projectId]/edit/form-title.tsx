"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Pencil } from "lucide-react";

interface FormTitleProps {
  initialData?: {
    title: string;
  };
  projectId?: string;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "El título debe tener al menos 3 caracteres.",
  }),
});

export const FormTitle = ({ initialData, projectId }: FormTitleProps) => {
  const [isEditing, setIsEditing] = useState(!projectId);
  const toggleEditing = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (projectId) {
        await axios.patch(`/api/research-projects/${projectId}`, values);
        toast.success("Título actualizado correctamente");
      } else {
        toast.error("No se proporcionó un ID de proyecto");
        return;
      }

      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Error al actualizar el título");
    }
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800">
        Título del proyecto
        {projectId && (
          <Button
            onClick={toggleEditing}
            variant="cyberGradient"
            size="sm"
            className="font-bold"
          >
            {isEditing ? (
              <>Cancelar</>
            ) : (
              <>
                <Pencil size={14} className="mr-1" /> Editar
              </>
            )}
          </Button>
        )}
      </div>

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Título del proyecto"
                      {...field}
                      className={cn("bg-white text-slate-800")}
                      variant="white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="linkLms"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isEditing && (
        <p className="text-sm mt-2 text-muted-foreground">
          {initialData?.title || "Sin título"}
        </p>
      )}
    </div>
  );
};
