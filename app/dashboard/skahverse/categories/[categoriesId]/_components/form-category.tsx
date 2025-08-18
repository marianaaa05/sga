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

interface CourseInit {
  id: string;
  title: string;
  categoryId: string | null;
}
interface ProjectInit {
  id: string;
  title: string;
  categoryId: string | null;
}
interface CategoryInit {
  id: string;
  name: string;
  courses?: { id: string }[];
  projects?: { id: string }[];
}

interface FormCategoryProps {
  initialCourses: CourseInit[];
  initialResearchProjects: ProjectInit[];
  initialCategories: CategoryInit[];
}

export const FormCategory = ({
  initialCourses,
  initialResearchProjects,
  initialCategories,
}: FormCategoryProps) => {
  const router = useRouter();

  const [categories, setCategories] =
    useState<CategoryInit[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [coursesState, setCoursesState] = useState(() =>
    initialCourses.map((course) => ({
      ...course,
      selectedCategory: course.categoryId || "",
    }))
  );

  const [researchProjectsState, setResearchProjectsState] = useState(() =>
    initialResearchProjects.map((project) => ({
      ...project,
      selectedCategory: project.categoryId || "",
    }))
  );

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  const [openAdmin, setOpenAdmin] = useState(false);

  const handleCreateCategory = async () => {
    if (!newCategoryName) return;

    try {
      const res = await axios.post("/api/courses/categories", {
        name: newCategoryName,
      });
      const nuevaCategoria = res.data;
      setCategories((prev) => [...prev, nuevaCategoria]);
      toast.success("Categoría creada");
      setNewCategoryName("");
    } catch {
      toast.error("Error al crear la nueva categoría");
    }
  };

  const handleUpdateCategory = async (
    id: string,
    type: "course" | "project"
  ) => {
    const selected =
      type === "course"
        ? coursesState.find((c) => c.id === id)?.selectedCategory
        : researchProjectsState.find((p) => p.id === id)?.selectedCategory;

    if (!selected) return toast.error("Selecciona una categoría válida");

    try {
      await axios.patch(
        `/api/${type === "course" ? "courses" : "projects"}/${id}`,
        {
          categoryId: selected,
        }
      );
      toast.success("Categoría actualizada");
      router.refresh();
      if (type === "course") {
        setCoursesState((prev) =>
          prev.map((c) => (c.id === id ? { ...c, categoryId: selected } : c))
        );
      } else {
        setResearchProjectsState((prev) =>
          prev.map((p) => (p.id === id ? { ...p, categoryId: selected } : p))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar categoría");
    }
  };

  const handleRenameCategory = async (categoryId: string, name: string) => {
    const newName = (name || "").trim();
    if (!newName) return toast.error("El nombre no puede estar vacío");
    if (renamingId) return; // ya hay una renombrando

    setRenamingId(categoryId);
    try {
      const res = await axios.patch(`/api/courses/categories/${categoryId}`, {
        name: newName,
      });
      const updated = res.data;
      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId ? { ...c, name: updated.name } : c
        )
      );
      toast.success("Nombre de categoría actualizado");
      setEditingId(null);
      setEditingName("");
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        toast.error("Ya existe una categoría con ese nombre");
      } else {
        toast.error("Error al renombrar categoría");
      }
    } finally {
      setRenamingId(null);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?"))
      return;
    if (deletingId) return;
    setDeletingId(categoryId);

    try {
      await axios.delete(`/api/courses/categories/${categoryId}`);
      toast.success("Categoría eliminada");
      // actualizar estado local para eliminarla de la lista
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      // además actualizar selects locales por si estaban seleccionadas
      setCoursesState((prev) =>
        prev.map((c) =>
          c.categoryId === categoryId
            ? { ...c, categoryId: null, selectedCategory: "" }
            : c
        )
      );
      setResearchProjectsState((prev) =>
        prev.map((p) =>
          p.categoryId === categoryId
            ? { ...p, categoryId: null, selectedCategory: "" }
            : p
        )
      );
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        toast.error(err.response?.data || "La categoría no está vacía");
      } else {
        toast.error("Error al eliminar la categoría");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
  <div className="space-y-10 p-4 sm:p-6">
    {/* Crear nueva categoría */}
    <div className="bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm border">
      <h3 className="font-bold text-lg text-slate-700 mb-2">
        Crear nueva categoría
      </h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Nombre nueva categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-1 w-full"
        />
        <Button
          onClick={handleCreateCategory}
          disabled={!newCategoryName.trim()}
          variant="cyberGradient"
          className="w-full sm:w-auto"
        >
          Crear
        </Button>
      </div>
    </div>

    {/* Administrar categorías */}
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className="text-lg font-bold">🛠️ Administrar categorías</h3>
        <Button
          variant="ghost"
          onClick={() => setOpenAdmin((s) => !s)}
          aria-expanded={openAdmin}
          aria-controls="admin-categories-panel"
          className="w-full sm:w-auto"
        >
          {openAdmin ? "Ocultar" : "Administrar"}
        </Button>
      </div>

      <div
        id="admin-categories-panel"
        className={`mt-3 overflow-hidden transition-all duration-200 ${
          openAdmin ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!openAdmin}
      >
        <div className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
          <p className="text-sm text-slate-600 mb-4">
            Renombra o elimina categorías vacías.
          </p>

          {/* Scroll adaptable */}
          <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-1 sm:pr-2">
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 bg-white/70 dark:bg-slate-900/60 rounded-md border w-full"
                  title={cat.name}
                >
                  <div className="min-w-0 flex-1">
                    {editingId === cat.id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full rounded-md border px-2 py-1 text-sm bg-transparent text-slate-800 dark:text-white"
                        placeholder="Nuevo nombre"
                      />
                    ) : (
                      <>
                        <div className="font-medium truncate text-slate-800 dark:text-white">
                          {cat.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.courses?.length ?? 0} cursos •{" "}
                          {cat.projects?.length ?? 0} proyectos
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {editingId === cat.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleRenameCategory(cat.id, editingName)
                          }
                          disabled={!!renamingId}
                        >
                          {renamingId === cat.id
                            ? "Guardando..."
                            : "Guardar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(null);
                            setEditingName("");
                          }}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditingId(cat.id);
                            setEditingName(cat.name);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCategory(cat.id)}
                          disabled={!!deletingId}
                        >
                          {deletingId === cat.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </Button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Cursos */}
    <h3 className="text-lg font-bold mb-2">📚 Cursos</h3>
    {coursesState.map((course, index) => (
      <div
        key={course.id}
        className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm w-full"
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
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => {
              const isEmpty =
                (cat.courses?.length ?? 0) === 0 &&
                (cat.projects?.length ?? 0) === 0;
              return (
                <SelectItem
                  key={cat.id}
                  value={cat.id}
                  className={isEmpty ? "text-slate-400" : ""}
                >
                  {cat.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button
          onClick={() => handleUpdateCategory(course.id, "course")}
          className="mt-3 w-full sm:w-auto"
          variant="linkLms"
        >
          Guardar categoría
        </Button>
      </div>
    ))}

    {/* Proyectos */}
    <h3 className="text-lg font-bold mb-2">📚 Proyectos</h3>
    {researchProjectsState.map((project, index) => (
      <div
        key={project.id}
        className="mt-6 border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm w-full"
      >
        <div className="font-bold flex flex-wrap items-center justify-between gap-1 text-slate-800 mb-2">
          {project.title}
        </div>
        <Select
          value={project.selectedCategory}
          onValueChange={(value) => {
            const updated = [...researchProjectsState];
            updated[index].selectedCategory = value;
            setResearchProjectsState(updated);
          }}
        >
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => {
              const isEmpty =
                (cat.courses?.length ?? 0) === 0 &&
                (cat.projects?.length ?? 0) === 0;
              return (
                <SelectItem
                  key={cat.id}
                  value={cat.id}
                  className={isEmpty ? "text-slate-400" : ""}
                >
                  {cat.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button
          onClick={() => handleUpdateCategory(project.id, "project")}
          className="mt-3 w-full sm:w-auto"
          variant="linkLms"
        >
          Guardar categoría
        </Button>
      </div>
    ))}
  </div>
);
};