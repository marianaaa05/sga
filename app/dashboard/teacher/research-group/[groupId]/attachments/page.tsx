import { UploadForm } from "./form-upload"; // ajusta la ruta según sea necesario

interface Props {
  params: {
    groupId: string;
  };
}

export default function UploadAttachmentPage({ params }: Props) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Subir archivos al semillero</h1>
      <UploadForm researchGroupId={params.groupId} />
    </div>
  );
}
