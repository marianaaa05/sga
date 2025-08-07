import { FormCategory } from "../[projectId]/_components/form-category";
import { FormTitle } from "../[projectId]/_components/form-title";
import { FormDescription } from "../[projectId]/_components/form-description";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface CreatePageProps {
  params: Promise<{
    groupId: string;
  }>;
}

const CreatePage = async ({ params }: CreatePageProps) => {
  // Esperar a que los parámetros se resuelvan
  const { groupId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <div className="space-y-6">
        <FormTitle groupId={groupId} />
        <FormDescription
          initialData={{ description: null }}
          groupId={groupId}
        />
        <FormCategory
          categories={categories}
          initialData={{ categoryId: null }}
        />
      </div>
    </div>
  );
};

export default CreatePage;