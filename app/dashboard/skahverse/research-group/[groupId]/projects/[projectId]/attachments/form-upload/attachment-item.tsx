"use client";

import {
  Trash2,
  Download,
  FileText,
  FileImage,
  FileArchive,
  Link as LinkIcon,
  ArrowDownUp,
  Eye,
  Text,
  FileChartPie,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface AttachmentItemProps {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  groupId: string;
  projectId: string;
  onDeleted: () => void;
  onUpdated: () => void;
}

const getIconByExtension = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="text-red-600 w-5 h-5" />;
    case "pptx":
      return <FileChartPie className="text-orange-600 w-5 h-5" />;
    case "doc":
    case "docx":
      return <FileText className="text-blue-600 w-5 h-5" />;
    case "txt":  
      return <Text className="text-blue-600 w-5 h-5" />;
    case "xlsx":
    case "xls":
    case "csv":  
      return <FileText className="text-green-600 w-5 h-5" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="text-green-600 w-5 h-5" />;
    case "zip":
    case "rar":
    case "7z":  
      return <FileArchive className="text-yellow-600 w-5 h-5" />;
    default:
      return <LinkIcon className="text-blue-600 w-5 h-5" />;
  }
};

export const AttachmentItem = ({
  id,
  name,
  url,
  createdAt,
  updatedAt,
  projectId,
  onDeleted,
  onUpdated,
}: AttachmentItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(`¿Estás seguro de eliminar "${name}"?`);
    if (!confirm) return;

    try {
      setIsDeleting(true);
      await axios.delete(
        `/api/research-projects/${projectId}/attachments/${id}`
      );
      toast.success("Archivo eliminado");
      onDeleted();
    } catch {
      toast.error("Error al eliminar el archivo");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplace = async (file: File) => {
    const confirm = window.confirm(`¿Deseas reemplazar el archivo "${name}"?`);
    if (!confirm) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsReplacing(true);
      await axios.patch(
        `/api/research-projects/${projectId}/attachments/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Archivo actualizado");
      onUpdated();
      setIsReplacing(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el archivo");
    } finally {
      setIsReplacing(false);
    }
  };

  function AttachmentButton({
    att,
  }: {
    att: { id: string; name: string; url: string };
  }) {
    const isFile = att.url.includes("/storage/v1/object/public/attachments/");

    return isFile ? (
      <Button
        size="icon"
        variant="ghost"
        className="text-blue-600"
        title="Descargar archivo"
        asChild
      >
        <a href={`/api/generic-download/project/${att.id}/download`}>
          <Download className="w-5 h-5" />
        </a>
      </Button>
    ) : (
      <Button
        size="icon"
        variant="ghost"
        className="text-blue-600"
        title="Visualizar enlace"
        asChild
      >
        <a href={att.url} target="_blank" rel="noopener noreferrer">
          <Eye className="w-5 h-5" />
        </a>
      </Button>
    );
  }

  return (
    <div className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-6 rounded-md gap-4 flex-wrap">
      <div className="flex items-center gap-x-2 sm:flex-1 min-w-0">
        {getIconByExtension(name)}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-base font-medium text-slate-800 dark:text-white w-0 flex-1"
          title={name}
        >
          {name}
        </a>
      </div>

      <div className="flex justify-center items-center gap-x-4 w-full sm:w-auto">
        <Button
          size="icon"
          variant="ghost"
          className="text-green-600"
          disabled={isDeleting}
          title="Reemplazar archivo"
          type="button"
        >
          <label className="cursor-pointer">
            {isReplacing ? (
              <ArrowDownUp className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowDownUp className="w-5 h-5" />
            )}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.txt,.pptx,.xlsx,.xls,.csv,.zip,.rar,.7z,.png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleReplace(file);
              }}
            />
          </label>
        </Button>

        <AttachmentButton att={{ id, name, url }} />

        <Button
          size="icon"
          variant="ghost"
          onClick={handleDelete}
          className="text-red-600"
          disabled={isDeleting}
          title="Eliminar archivo"
          type="button"
        >
          {isDeleting ? (
            <Trash2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-right w-full sm:w-auto">
        Subido el {new Date(createdAt).toLocaleDateString()} <br />
        Actualizado el {new Date(updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};
