"use client";

import { Trash2, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AttachmentItemProps {
  id: string;
  name: string;
  url: string;
}

export const AttachmentItem = ({ id, name, url }: AttachmentItemProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/attachments/${id}`);
      toast.success("Archivo eliminado");
      router.refresh();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = name; // sugiere nombre para guardar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar archivo", error);
      toast.error("Error al descargar archivo");
    }
  };

  return (
    <div className="flex justify-between items-center border px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-md">
      <div className="flex items-center gap-x-2">
        <FileText className="text-blue-600 w-5 h-5" />
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {name}
        </a>
      </div>

      <div className="flex items-center gap-x-2">
        <Button onClick={handleDownload} size="icon" variant="ghost">
          <Download className="w-5 h-5" />
        </Button>

        <Button size="icon" variant="ghost" onClick={handleDelete} className="text-red-600">
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
