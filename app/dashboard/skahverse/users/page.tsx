import { ReactNode } from "react";
import {
  getSemilleroMembers,
  getProjectParticipants,
  getCourseStudents,
  getCourseCreators,
} from "@/lib/teacher-users-page";
import { ChevronRight } from "lucide-react";

function groupBy<T>(arr: T[], keyFn: (item: T) => string | null | undefined) {
  const map = new Map<string, T[]>();
  for (const item of arr) {
    const keyRaw = keyFn(item) ?? "Sin asignar";
    const key = String(keyRaw);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return map;
}

function CountBadge({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[600px] w-full border-collapse">
        <thead>
          <tr className="bg-slate-200">
            {headers.map((h) => (
              <th key={h} className="p-2 text-left border text-sm md:text-base">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cols, i) => (
            <tr key={i} className="odd:bg-white even:bg-slate-50">
              {cols.map((c, j) => (
                <td key={j} className="p-2 border align-top text-xs md:text-sm">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function TeacherUsersPage() {
  const semilleroMembers = await getSemilleroMembers();
  const projectParticipants = await getProjectParticipants();
  const courseStudents = await getCourseStudents();
  const courseCreators = await getCourseCreators();

  const semilleroMap = groupBy(semilleroMembers, (u) => u.semillero);
  const proyectoMap = groupBy(projectParticipants, (u) => u.proyecto);
  const courseStudentsMap = groupBy(courseStudents, (u) => u.curso);
  const courseCreatorsMap = groupBy(courseCreators, (u) => u.curso);

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h1 className="text-xl md:text-2xl font-bold">
        👤 Usuarios vinculados a SKAHverse
      </h1>

      {/* SEMILLEROS */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-lg md:text-xl font-semibold">👾 Semilleros</h2>
          <div className="text-sm text-slate-600">
            Semilleros con miembros: <strong>{semilleroMap.size}</strong>
          </div>
        </div>

        <div className="space-y-3">
          {Array.from(semilleroMap.entries()).map(([semillero, members]) => (
            <details key={semillero} className="group rounded-md border">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm md:text-md font-medium">
                    {semillero}
                  </span>
                  <CountBadge>{members.length}</CountBadge>
                </div>
                <ChevronRight className="h-4 w-4 text-purple-600 transition-transform group-open:rotate-90" />
              </summary>

              <div className="p-4">
                <SimpleTable
                  headers={["Nombre", "Apellido", "Correo"]}
                  rows={members.map((m) => [
                    m.nombre ?? "—",
                    m.apellido ?? "—",
                    m.email ?? "—",
                  ])}
                />
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-lg md:text-xl font-semibold">🚀 Proyectos</h2>
          <div className="text-sm text-slate-600">
            Proyectos listados: <strong>{proyectoMap.size}</strong>
          </div>
        </div>

        <div className="space-y-3">
          {Array.from(proyectoMap.entries()).map(([proyecto, participants]) => {
            const creators = participants.filter((p) => p.rol === "CREADOR");
            const others = participants.filter((p) => p.rol !== "CREADOR");

            return (
              <details key={proyecto} className="group rounded-md border">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm md:text-md font-medium">
                      {proyecto} — Semillero:{" "}
                      {participants[0].semillero ?? "—"}
                    </span>
                    <CountBadge>{participants.length}</CountBadge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-purple-600 transition-transform group-open:rotate-90" />
                </summary>

                <div className="p-4 space-y-4">
                  {creators.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-medium">
                        Creador{creators.length > 1 ? "es" : ""}
                      </h3>
                      <SimpleTable
                        headers={["Nombre", "Apellido", "Correo"]}
                        rows={creators.map((c) => [
                          c.nombre ?? "—",
                          c.apellido ?? "—",
                          c.email ?? "—",
                        ])}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs md:text-sm font-medium">
                      Contribuidores:
                    </h3>
                    <SimpleTable
                      headers={["Nombre", "Apellido", "Correo"]}
                      rows={others.map((o) => [
                        o.nombre ?? "—",
                        o.apellido ?? "—",
                        o.email ?? "—",
                      ])}
                    />
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* CURSOS */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-lg md:text-xl font-semibold">👨‍🎓 Cursos</h2>
          <div className="text-sm text-slate-600">
            Cursos listados:{" "}
            <strong>
              {new Set([
                ...courseStudentsMap.keys(),
                ...courseCreatorsMap.keys(),
              ]).size}
            </strong>
          </div>
        </div>

        <div className="space-y-3">
          {Array.from(
            new Set([
              ...Array.from(courseStudentsMap.keys()),
              ...Array.from(courseCreatorsMap.keys()),
            ])
          ).map((cursoName) => {
            const students = courseStudentsMap.get(cursoName) ?? [];
            const creators = courseCreatorsMap.get(cursoName) ?? [];
            const total = students.length + creators.length;

            return (
              <details key={cursoName} className="group rounded-md border">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm md:text-md font-medium">
                      {cursoName}
                    </span>
                    <CountBadge>{total}</CountBadge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-purple-600 transition-transform group-open:rotate-90" />
                </summary>

                <div className="p-4 space-y-4">
                  {creators.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-medium">
                        Creador{creators.length > 1 ? "es" : ""}
                      </h3>
                      <SimpleTable
                        headers={["Nombre", "Apellido", "Correo"]}
                        rows={creators.map((c) => [
                          c.nombre ?? "—",
                          c.apellido ?? "—",
                          c.email ?? "—",
                        ])}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs md:text-sm font-medium">
                      Estudiantes
                    </h3>
                    <SimpleTable
                      headers={["Nombre", "Apellido", "Correo"]}
                      rows={students.map((s) => [
                        s.nombre ?? "—",
                        s.apellido ?? "—",
                        s.email ?? "—",
                      ])}
                    />
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
