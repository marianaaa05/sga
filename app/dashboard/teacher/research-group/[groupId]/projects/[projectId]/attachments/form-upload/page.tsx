"use client";

import { useParams } from "next/navigation";
import { UploadForm } from "./form-upload";
import { useEffect, useState } from "react";
import { AttachmentItem } from "./attachment-item";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
  projectId: string;
}

const ResearchGroupViewPage = () => {
  const { projectId } = useParams();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}/attachments`);
        setAttachments(res.data);
        router.refresh();
      } catch (error) {
        console.error("Error al obtener los archivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
  }, [projectId]);

  const params = useParams();

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            🗃️ Gestionar archivos del proyecto
          </h1>
          <p className="text-sm text-slate-600">
            Sube, gestiona y consulta los documentos asociados al proyecto
            dentro del grupo de investigación
          </p>
        </div>

        <Link
          href={`/dashboard/teacher/research-group/${params.groupId}/projects/${params.projectId}/edit`}
        >
          <Button variant="neonPurple" size="sm">
            Editar proyecto
          </Button>
        </Link>
      </div>

      <UploadForm projectId={params.projectId as string} />

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
              <AttachmentItem key={attachment.id} {...attachment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchGroupViewPage;
