"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { FileUpload } from "@/components/file-upload";
// import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImagePlay, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FormImageProps {
  initialData: Course;
  courseId: string;
}
// interface FormImageProps{
//   initialData: {
//     title: string;
//   };
//   courseId: string;
// }

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "La imagen del curso es requerida",
  }),
});

export const FormImage = ({ initialData, courseId }: FormImageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Curso actualizado correctamente");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Error al guardar la imagen del curso");
    }
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      {/* <div className="font-bold flex items-center justify-between text-slate-800"> */}
      <div className="font-bold flex flex-wrap items-center justify-between gap-1text-slate-800">
        Imagen del curso
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
              <Upload size={4} />
              Subir imagen
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <ImagePlay size={4} />
              Cambiar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2">
          {initialData.imageUrl ? (
            <img
              src={initialData.imageUrl}
              alt="Imagen del curso"
              className="w-full h-80 object-cover rounded-md mb-3"
            />
          ) : (
            <p className="text-slate-600 italic">No hay imagen disponible</p>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="courseImage"
                      onChange={field.onChange}

                      // disabled={isSubmitting}
                      // placeholder="Imagen del curso"
                      // {...field}
                      // className={cn("bg-white text-slate-800")}
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
