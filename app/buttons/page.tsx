import { Button } from "../../components/ui/button";
 
 const Buttons = () => {
   return ( 
     <div className="grid grid-cols-3 gap-4 p-4 text-center">
             <Button variant={"default"} size={"default"}>
         <span>default</span>
       </Button>
       <Button variant={"destructive"} size={"default"}>
         <span>destructive</span>
       </Button>
       <Button variant={"outline"} size={"default"}>
         <span>outline</span>
       </Button>
       <Button variant={"secondary"} size={"default"}>
         <span>secondary</span>
       </Button>
       <Button variant={"ghost"} size={"default"}>
         <span>ghost</span>
       </Button>
       <Button variant={"link"} size={"default"}>  
         <span>link</span>
       </Button>
       <Button variant={"primary"} size={"default"}>
         <span>primary</span>
       </Button>
       <Button variant={"secondaryLms"} size={"default"}>
         <span>secundaryLms</span>
       </Button>
       <Button variant={"success"} size={"default"}>
         <span>success</span>
       </Button>
       <Button variant={"warning"} size={"default"}>
         <span>warning</span>
       </Button>
       <Button variant={"danger"} size={"default"}>
         <span>danger</span>
       </Button>
       <Button variant={"outlineLms"} size={"default"}>
         <span>outlineLms</span>
       </Button>
       <Button variant={"ghostLms"} size={"default"}>
         <span>ghostLms</span>
       </Button>
       <Button variant={"linkLms"} size={"default"}>
         <span>linkLms</span>
       </Button>
       <Button variant={"neonBlue"} size={"default"}>
         <span>neonBlue</span>
       </Button>
       <Button variant={"neonPink"} size={"default"}>
         <span>neonPink</span>
       </Button>
       <Button variant={"neonPurple"} size={"default"}>
         <span>neonPurple</span>
       </Button>
       <Button variant={"neonGreen"} size={"default"}> 
         <span>neonGreen</span>
        </Button>
       <Button variant={"neonOrange"} size={"default"}>
         <span>neonOrange</span>
       </Button>
       <Button variant={"cyberGradient"} size={"default"}>
         <span>cyberGradient</span>
      </Button>
     </div>
    );
 }
  
 export default Buttons 