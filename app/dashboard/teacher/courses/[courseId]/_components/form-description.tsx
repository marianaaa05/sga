"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FormDescriptionProps {
  initialData: {
    description: string;
  };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(3, {
    message: "La descripción del curso es requerida",
  }),
});

export const FormDescription = ({
  initialData,
  courseId,
}: FormDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing((current) => !current);
  };
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Curso actualizado correctamente");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Error al guardar la descripción del curso");
    }
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      <div className="font-bold flex items-center justify-between text-slate-800">
        Descripción del curso
        <Button
          onClick={toggleEditing}
          variant="cyberGradient"
          size="sm"
          className="font-bold"
        >
          {isEditing ? (
            <>
              Cancelar
            </>
          ) : (
            <>
              <UserPen size={4} />
            Agregar descripción</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-600 italic"
          )}
        >
          {initialData.description || "No hay descripción disponible"}
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
                      placeholder="Descripción del curso"
                      {...field}
                      className={cn("bg-white text-slate-800")}
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
