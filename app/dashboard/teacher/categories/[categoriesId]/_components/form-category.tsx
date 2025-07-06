"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormCategoryProps {
  initialCourses: {
    id: string;
    title: string;
    categoryId: string | null;
  }[];
  initialCategories: {
    id: string;
    name: string;
  }[];
}

export const FormCategory = ({
  initialCourses,
  initialCategories,
}: FormCategoryProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Mantenemos una copia editable de los cursos
  const [coursesState, setCoursesState] = useState(() =>
    initialCourses.map((course) => ({
      ...course,
      selectedCategory: course.categoryId || "",
    }))
  );

  const handleCreateCategory = async () => {
    if (!newCategoryName) return;

    try {
      const res = await axios.post("/api/courses/categories", { name: newCategoryName });
      const nuevaCategoria = res.data;
      setCategories((prev) => [...prev, nuevaCategoria]);
      toast.success("Categoría creada");
      setNewCategoryName("");
    } catch {
      toast.error("Error al crear la nueva categoría");
    }
  };

  const handleUpdateCourseCategory = async (courseId: string) => {
    const selected = coursesState.find((c) => c.id === courseId)?.selectedCategory;
    if (!selected) return toast.error("Selecciona una categoría válida");

    try {
      await axios.patch(`/api/courses/${courseId}`, { categoryId: selected });
      toast.success("Categoría actualizada");
      router.refresh();
    } catch {
      toast.error("Error al actualizar categoría");
    }
  };

  return (
  <div className="space-y-10">
    {/* Crear nueva categoría */}
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm border">
      <h3 className="font-bold text-lg text-slate-700 mb-2">
        Crear nueva categoría
      </h3>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre nueva categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          onClick={handleCreateCategory}
          disabled={!newCategoryName}
          variant="cyberGradient"
        >
          Crear
        </Button>
      </div>
    </div>

    
    {coursesState.map((course, index) => (
      <div
        key={course.id}
        className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm"
      >
        <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800 mb-2">
          {course.title}
        </div>

        <Select
          value={course.selectedCategory}
          onValueChange={(value) => {
            const updated = [...coursesState];
            updated[index].selectedCategory = value;
            setCoursesState(updated);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => handleUpdateCourseCategory(course.id)}
          className="mt-3"
          variant="linkLms"
        >
          Guardar categoría
        </Button>
      </div>
    ))}
  </div>
);
}