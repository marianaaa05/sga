"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Upload } from "lucide-react";

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file && typeof file === "object" && "name" in file, {
      message: "Debe seleccionar un archivo válido.",
    }),
});

interface UploadFormProps {
  courseId: string;
}

export const UploadForm = ({ courseId }: UploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const file = values.file;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `attachments/${courseId}/${fileName}`;


    try {
      setIsUploading(true);

      const { error } = await supabase.storage
        .from("attachments")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        toast.error("No se pudo subir el archivo");
        return;
      }

      toast.success("Archivo subido con éxito ✅");
      toggleEditing();
      form.reset();
      router.refresh();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Error inesperado");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm mt-4">
      <div className="font-bold flex items-center justify-between text-slate-800">
        Material de apoyo
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
              <Upload size={16} className="mr-1" />
              Subir archivo
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        if (e.target.files?.[0]) field.onChange(e.target.files[0]);
                      }}
                      disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isUploading || !form.formState.isValid}
              variant="linkLms"
            >
              {isUploading ? "Subiendo..." : "Guardar archivo"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
