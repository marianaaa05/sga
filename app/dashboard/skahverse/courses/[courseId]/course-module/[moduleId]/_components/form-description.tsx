"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FormDescriptionProps {
  initialData: {
    description: string | null;
  };
  moduleId?: string; 
  courseId?: string;   
  isCreateMode?: boolean;
  onCreated?: (moduleId: string) => void; 
}

const formSchema = z.object({
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres",
  }),
});

export const FormDescription = ({
  initialData,
  moduleId,
  courseId,
  isCreateMode = false,
  onCreated,
}: FormDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(isCreateMode);
  const toggleEditing = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isCreateMode && courseId) {
        const response = await axios.post("/api/course-modules", {
          ...values,
          moduleId: courseId,
        });

        const newModuleId = response.data.id;
        toast.success("Módulo creado correctamente");

        if (onCreated) {
          onCreated(newModuleId);
        }
        router.push(`/dashboard/skahverse/courses/${courseId}/course-module/${newModuleId}`);
        router.refresh();
      } else if (moduleId) {
        await axios.patch(`/api/course-modules/${moduleId}`, values);
        toast.success("Descripción actualizada correctamente");
        toggleEditing();
        router.refresh();
      }
    } catch {
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800">
        Descripción del módulo
        {!isCreateMode && (
          <Button
            onClick={toggleEditing}
            variant="cyberGradient"
            size="sm"
            className="font-bold"
          >
            {isEditing ? (
              <>
                <X size={16} className="mr-1" /> Cancelar
              </>
            ) : (
              <>
                <Pencil size={16} className="mr-1" /> Editar descripción
              </>
            )}
          </Button>
        )}
      </div>

      {!isEditing && (
        <p className="text-sm mt-2 text-muted-foreground whitespace-pre-wrap">
          {initialData.description || "Sin descripción"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Describe el propósito, objetivos o contexto del módulo."
                      className={cn("bg-white text-slate-800 min-h-[120px]")}
                      {...field}
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
                variant={"linkLms"}
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
