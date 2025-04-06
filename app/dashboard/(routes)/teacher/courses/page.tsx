import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return ( 
      <div className="p-5">
       <Link href="/dashboard/teacher/create">
         <Button variant={"neonPurple"} size="sm">
           Nuevo Curso
         </Button>
       </Link>
      </div>
   );
}
 
export default CoursesPage;