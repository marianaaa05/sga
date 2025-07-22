import { UploadForm } from "./form-upload";

interface UploadPageProps {
  params: {
    projectId: string;
  };
}

const UploadPage = ({ params }: UploadPageProps) => {
  return (
    <div className="p-6">
      <UploadForm projectId={params.projectId} />
    </div>
  );
};

export default UploadPage;
