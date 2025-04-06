import { Button } from "../../components/ui/button";
 
 const Buttons = () => {
   return ( 
     <div className="grid grid-cols-3 gap-4 p-4 text-center">
             <Button variant={"default"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"destructive"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"outline"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"secondary"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"ghost"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"link"} size={"default"}>  
         Link
       </Button>
       <Button variant={"primary"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"secondaryLms"} size={"default"}>
         <span>secundaryLms</span>
       </Button>
       <Button variant={"success"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"warning"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"danger"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"outlineLms"} size={"default"}>
         <span>outlineLms</span>
       </Button>
       <Button variant={"ghostLms"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"linkLms"} size={"default"}>
         <span>Link</span>
       </Button>
       <Button variant={"neonBlue"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"neonPink"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"neonPurple"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"neonGreen"} size={"default"}> 
         <span>Click me</span>
        </Button>
       <Button variant={"neonOrange"} size={"default"}>
         <span>Click me</span>
       </Button>
       <Button variant={"cyberGradient"} size={"default"}>
         <span>Click me</span>
      </Button>
     </div>
    );
 }
  
 export default Buttons 