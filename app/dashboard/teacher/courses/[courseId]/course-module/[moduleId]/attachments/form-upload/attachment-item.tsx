"use client";

import {
  Trash2,
  Download,
  FileText,
  FileImage,
  FileArchive,
  FileCode,
  Youtube,
  ArrowDownUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface AttachmentItemProps {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  type: "project" | "module";
}

const getIconByExtension = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="text-red-600 w-5 h-5" />;
    case "pptx":
      return <FileImage className="text-red-600 w-5 h-5" />;
    case "doc":
    case "docx":
      return <FileText className="text-blue-600 w-5 h-5" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="text-green-600 w-5 h-5" />;
    case "zip":
    case "rar":
      return <FileArchive className="text-yellow-600 w-5 h-5" />;
    case "js":
    case "ts":
    case "json":
      return <FileCode className="text-purple-600 w-5 h-5" />;
    default:
      return <Youtube className="text-red-600 w-5 h-5" />;
  }
};

export const AttachmentItem = ({
  id,
  name,
  url,
  createdAt,
  updatedAt,
  parentId,
  type,
}: AttachmentItemProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(`¿Estás seguro de eliminar "${name}"?`);
    if (!confirm) return;

    try {
      setIsDeleting(true);
      await axios.delete(
        `/api/${
          type === "project" ? "projects" : "course-modules"
        }/${parentId}/attachments/${id}`
      );
      toast.success("Archivo eliminado");
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
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
        `/api/${
          type === "project" ? "projects" : "course-modules"
        }/${parentId}/attachments/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Archivo actualizado");
      router.refresh();
    } catch (error) {
      console.error("Error al reemplazar el archivo:", error);
      toast.error("Error al actualizar el archivo");
    } finally {
      setIsReplacing(false);
    }
  };

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      toast.error("Error al descargar el archivo");
    }
  };

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
          disabled={isDeleting || isReplacing}
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
              accept=".pdf,.doc,.docx, .pptx,.zip,.rar,.png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleReplace(file);
              }}
            />
          </label>
        </Button>

        <Button
          onClick={handleDownload}
          size="icon"
          variant="ghost"
          className="text-blue-600"
          title="Descargar archivo"
          type="button"
        >
          <Download className="w-5 h-5" />
        </Button>

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
        Subido el {new Date(createdAt).toLocaleDateString()}
        <br />
        Actualizado el {new Date(updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};
