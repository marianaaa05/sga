/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { UserPen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormTitleProps {
  initialData: {
    title: string;
  };
  courseId: string;
}
// zod valida los datos del formulario
const formSchema = z.object({
  title: z.string().min(3, {
    message: "El nombre del curso es obligatorio",
  }),
});

export const FormTitle = ({ initialData, courseId }: FormTitleProps) => {
  //controla si el formulario esta en edicion o no
  const [isEditing, setIsEditing] = useState(false);
  //al hacer clic, se activa toggleEditing() y cambia a un input de edición
  const toggleEditing = () => {
    setIsEditing((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Título del formulario enviado", values);
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      <div className="font-bold flex items-center justify-between text-slate-800">
        Nombre del curso
        <Button
          onClick={toggleEditing}
          variant="cyberGradient"
          size="sm"
          className="font-bold"
        >
          {isEditing ? (
            <>
            <UserPen size={4} />
            Editar nombre</>
          ) : (
            <>Cancelar</>
          )}
        </Button>
      </div>
      {!isEditing && (
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
                      placeholder="Nombre del curso"
                      {...field}
                      className={cn("bg-white text-slate-800")}
                     
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit" variant={"linkLms"}>
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
