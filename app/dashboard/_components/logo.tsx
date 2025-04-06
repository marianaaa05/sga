import Image from "next/image";
 
 const Logo = () => {
   return (
     <div className="flex items-center gap-2 flex-wrap">
       <Image 
         height={50}
         width={50}
         alt="Logo Kernel"
         src="/aunar.svg"
         className="rounded-md"
       />
       <Image 
         height={50}
         width={50}
         alt="Logo Sinapsis"
         src="/logo.svg"
         className="rounded-md"
       />
       <Image 
         height={50}
         width={50}
         alt="Logo Animus"
         src="/logo-autonoma-de-narino.svg"
         className="rounded-md"
         />
     </div>
   );
 }
 
 export default Logo;