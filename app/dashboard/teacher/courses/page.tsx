import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return ( 
      <div className="p-5">
        {/* ruta para crear un curso */}
       <Link href="/dashboard/teacher/courses/create">
         <Button variant={"neonPurple"} size="sm">
           Nuevo Curso
         </Button>
       </Link>
      </div>
   );
}
 
export default CoursesPage;