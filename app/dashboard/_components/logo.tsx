import Image from "next/image";
import Link from "next/link";
 
 const Logo = () => {
   return (
     <Link href="/">
      <div className="flex items-center gap-1 flex-wrap">
        <Image
          height={52}
          width={52}
          alt="Logo Sinapsis"
          src="/sinapsis.png"
        />
        <Image
          height={44}
          width={44}
          alt="Logo Animus Cracking"
          src="/Animus.png"
        />
        <Image
          height={70}
          width={70}
          alt="Logo Kernel"
          src="/Kernel.png"
          className="mt-4"
        />
      </div>
    </Link>
   );
 }
 
 export default Logo;