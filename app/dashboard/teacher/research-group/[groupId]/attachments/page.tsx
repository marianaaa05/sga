"use client";

import { useParams } from "next/navigation";
import { UploadForm } from "./form-upload"; 
import { useEffect, useState } from "react";
import { AttachmentItem } from "./attachment-item";
import axios from "axios";

interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
}

const AttachmentsPage = () => {
  const { groupId } = useParams();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get(`/api/research-group/${groupId}/attachments`);
        setAttachments(res.data);
      } catch (err) {
        console.error("Error al cargar archivos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttachments();
  }, [groupId]);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Material del Semillero</h1>

      <UploadForm researchGroupId={groupId as string} />

      <div>
        <h2 className="text-lg font-semibold mt-8 mb-4">Archivos subidos</h2>
        {loading ? (
          <p>Cargando archivos...</p>
        ) : attachments.length === 0 ? (
          <p className="text-muted-foreground">No hay archivos todavía.</p>
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

export default AttachmentsPage;
