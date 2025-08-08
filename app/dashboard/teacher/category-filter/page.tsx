"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  isPublished: boolean;
}
interface Project {
  id: string;
  title: string;
  researchGroupId: string;
}
interface Category {
  id: string;
  name: string;
  courses: Course[];
  projects: Project[];
}

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/category-filter");
        if (!res.ok) throw new Error("Error al cargar categorías");
        const data: { categories: Category[] } = await res.json();
        setCategories(data.categories);
        if (data.categories.length) {
          setSelectedCatId(data.categories[0].id);
        }
      } catch {
        setError("Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!categories.length) return <p>No hay categorías disponibles.</p>;

  const selected = categories.find((cat) => cat.id === selectedCatId)!;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          🔍Filtrar cursos y proyectos
        </h2>
        <p className="text-sm text-slate-600">
          Puedes filtrar los cursos y proyectos de Semilleros de Investigación
          por categoría para facilitar la búsqueda según tus intereses.
        </p>
      </div>
      <div>
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filtrar por categoría
        </label>
        <select
          id="category-select"
          className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500"
          value={selectedCatId}
          onChange={(e) => setSelectedCatId(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            📚 Cursos de {selected.name}
          </h3>
          {selected.courses.filter((c) => c.isPublished).length > 0 ? (
            <ul className="space-y-1 text-sm">
              {selected.courses
                .filter((course) => course.isPublished)
                .map((course) => (
                  <div key={course.id}>
                    <Button
                      variant="cyberGradient"
                      size="sm"
                      className="w-full mb-2"
                    >
                      <Link
                        href={`/dashboard/teacher/courses/${course.id}/contents`}                      >
                        {course.title}
                      </Link>
                    </Button>
                  </div>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              No hay cursos publicados en esta categoría.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            🧪 Proyectos de {selected.name}
          </h3>
          {selected.projects.length ? (
            <div className="list-none space-y-1 text-sm">
              {selected.projects.map((proj) => (
                <li key={proj.id}>
                  <Button
                    variant="cyberGradient"
                    size="sm"
                    className="w-full mb-2"                  
                  >
                    <Link
                      href={`/dashboard/teacher/research-group/${proj.researchGroupId}/view`}                    >
                      {proj.title}
                    </Link>
                  </Button>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
