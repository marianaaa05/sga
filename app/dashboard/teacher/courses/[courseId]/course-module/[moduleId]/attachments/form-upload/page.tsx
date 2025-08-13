"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadForm } from "./form-upload";
import { AttachmentItem } from "./attachment-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  moduleId: string;
  key: string;
}

const CourseModuleViewPage = () => {
  const { moduleId, courseId } = useParams();

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttachments = async () => {
    try {
      const res = await axios.get(
        `/api/course-modules/${moduleId}/attachments`
      );
      setAttachments(res.data);
    } catch (error) {
      console.error("Error al obtener los archivos del módulo ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (moduleId) fetchAttachments();
  }, [moduleId]);

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            🗃️ Gestionar archivos del módulo
          </h1>
          <p className="text-sm text-slate-600">
            Sube, gestiona y consulta los documentos asociados a este módulo del
            curso.
          </p>
        </div>
        <Link
          href={`/dashboard/teacher/courses/${courseId}/course-module/${moduleId}`}
        >
          <Button variant="neonPurple" size="sm">
            Editar módulo
          </Button>
        </Link>
      </div>

      <UploadForm moduleId={moduleId as string}
      onUploaded={fetchAttachments} />

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Archivos subidos</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando archivos...</p>
        ) : attachments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay archivos todavía.
          </p>
        ) : (
          <div className="space-y-4">
            {attachments.map((attachment) => (
              <AttachmentItem
                key={attachment.id}
                id={attachment.id}
                name={attachment.name}
                url={attachment.url}
                createdAt={attachment.createdAt}
                updatedAt={attachment.updatedAt}
                parentId={attachment.moduleId}
                type="module"
                onDeleted={fetchAttachments}
                onUpdated={fetchAttachments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseModuleViewPage;
