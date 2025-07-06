"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface FormCategoryProps {
  courseId: string;
  initialData: { categoryId: string };
  categories: { id: string; name: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "La categoría del curso es requerida",
  }),
});

export const FormCategory = ({
  courseId,
  initialData,
  categories: initialCategories,
}: FormCategoryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);

  const toggleEditing = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleCreateCategory = async () => {
    if (!newCategoryName) return;

    try {
      const res = await axios.post("/api/categories", { name: newCategoryName });
      const nuevaCategoria = res.data;
      setCategories((prev) => [...prev, nuevaCategoria]);
      form.setValue("categoryId", nuevaCategoria.id);
      toast.success("Categoría creada");
      setNewCategoryName("");
      setCreatingNew(false);
    } catch {
      toast.error("Error al crear la nueva categoría");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Categoría actualizada correctamente");
      toggleEditing();
      router.refresh();
    } catch {
      toast.error("Error al guardar la categoría del curso");
    }
  };

  return (
    <div className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
      <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800">
        Categoría del curso
        <Button
          onClick={toggleEditing}
          variant="cyberGradient"
          size="sm"
          className="font-bold"
        >
          {isEditing ? <>Cancelar</> : <><UserPen size={4} />Editar categoría</>}
        </Button>
      </div>

      {!isEditing && (
        <p className={cn("text-sm mt-2", !initialData.categoryId && "text-slate-600 italic")}>
          {categories.find((cat) => cat.id === initialData.categoryId)?.name || "No hay categoría disponible"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={(value) => {
                        if (value === "__new__") {
                          setCreatingNew(true);
                          field.onChange(""); // limpiamos el valor mientras tanto
                        } else {
                          setCreatingNew(false);
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona o crea una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="__new__">+ Crear nueva categoría</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {creatingNew && (
              <div className="space-y-2">
                <Input
                  placeholder="Nombre nueva categoría"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName}
                >
                  Guardar nueva categoría
                </Button>
              </div>
            )}

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
    </div>
  );
};



//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
//         <FormField
//           control={form.control}
//           name="categoryId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Categoría</FormLabel>
//               <FormControl>
//                 <Select
//                   disabled={isSubmitting || isLoading}
//                   onValueChange={field.onChange}
//                   value={field.value}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Selecciona una categoría" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" disabled={isSubmitting || isLoading}>
//           Guardar
//         </Button>
//       </form>
//     </Form>
//   );
// };
