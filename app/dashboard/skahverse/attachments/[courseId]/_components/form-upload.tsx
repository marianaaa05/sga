"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, Link } from "lucide-react";

const formSchema = z.object({
  type: z.enum(["file", "link"]),
  file: z.any().optional(),
  linkUrl: z
    .string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")),
}).refine((data) => {
  if (data.type === "file") return data.file && typeof data.file === "object";
  if (data.type === "link") return !!data.linkUrl;
  return false;
}, {
  message: "Debes completar el campo según el tipo de material.",
  path: ["file"], 
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
      type: "file",
      file: undefined,
      linkUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);

      if (values.type === "file") {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("courseId", courseId);

        const res = await fetch("/api/attachments", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Error al subir el archivo");
      }

      if (values.type === "link") {
        const res = await fetch("/api/attachments/link", {
          method: "POST",
          body: JSON.stringify({
            linkUrl: values.linkUrl,
            courseId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al guardar el enlace");
      }

      toast.success("Material agregado correctamente");
      form.reset();
      toggleEditing();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado");
    } finally {
      setIsUploading(false);
    }
  };

  const type = form.watch("type");

  return (
    <div className="space-y-10">
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm border">
      <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800 mb-2">
        Material de apoyo
        <Button onClick={toggleEditing} variant="cyberGradient" size="sm" className="font-bold">
          {isEditing ? "Cancelar" : (<><Upload size={16} className="mr-1" /> Subir material</>)}
        </Button>
      </div>
      </div>

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            {/* Tipo de material */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de material</FormLabel>
                  <select
                    {...field}
                    className="w-full p-2 rounded border"
                    disabled={isUploading}
                  >
                    <option value="file">Archivo</option>
                    <option value="link">Enlace externo</option>
                  </select>
                </FormItem>
              )}
            />

            {type === "file" && (
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Archivo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.pptx,.xlsx,.xls,.csv,.zip,.rar,.7z,.png,.jpg,.jpeg"
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
            )}

            {type === "link" && (
              <FormField
                control={form.control}
                name="linkUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Link className="inline mr-1" /> Enlace externo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://..."
                        {...field}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              disabled={isUploading || !form.formState.isValid}
              variant="linkLms"
            >
              {isUploading ? "Subiendo..." : "Guardar material"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
