"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Upload, Video } from "lucide-react";

const formSchema = z
  .object({
    type: z.enum(["file", "video"]),
    file: z.any().optional(),
    videoUrl: z
      .string()
      .url("Debe ser una URL válida")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.type === "file")
        return data.file && typeof data.file === "object";
      if (data.type === "video") return !!data.videoUrl;
      return false;
    },
    {
      message: "Debes completar el campo según el tipo de material.",
      path: ["file"],
    }
  );

interface UploadFormProps {
  moduleId: string;
  onUploadComplete?: () => void;
}

export const UploadForm = ({ moduleId, onUploadComplete }: UploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "file",
      file: undefined,
      videoUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);

      if (values.type === "file") {
        const formData = new FormData();
        formData.append("file", values.file);
          //  app\api\course-modules\[moduleId]\attachments\route.ts
        const res = await fetch(`/api/course-modules/${moduleId}/attachments`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Error al subir el archivo");
      }

      if (values.type === "video") {
        const res = await fetch(`/api/course-modules/${moduleId}/video`, {
          method: "POST",
          body: JSON.stringify({
            videoUrl: values.videoUrl,
            moduleId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al guardar el enlace de video");
      }

      toast.success("Material agregado correctamente");
      form.reset();
      toggleEditing();
      onUploadComplete?.();
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
          Material del módulo
          <Button
            onClick={toggleEditing}
            variant="cyberGradient"
            size="sm"
            className="font-bold"
          >
            {isEditing ? (
              "Cancelar"
            ) : (
              <>
                <Upload size={16} className="mr-1" /> Subir archivo
              </>
            )}
          </Button>
        </div>
      </div>

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
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
                    <option value="video">Enlace de video</option>
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
                        accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          if (e.target.files?.[0])
                            field.onChange(e.target.files[0]);
                        }}
                        disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "video" && (
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Video className="inline mr-1" /> Enlace de YouTube
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtube.com/..."
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
