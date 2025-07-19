"use client";

import { AttachmentItem } from "./attachment-item";

interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
}

interface AttachmentListProps {
  attachments: Attachment[];
  groupId: string;
}

export const AttachmentList = ({ attachments }: AttachmentListProps) => {
  if (attachments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay archivos cargados en este semillero.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <AttachmentItem key={attachment.id} {...attachment} />
      ))}
    </div>
  );
};
