import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    domains: [
      "kll9q4c13y.ufs.sh",    
      "res.cloudinary.com", 
    ],
  },
  // experimental: {
  //   // Desactiva la generación tipada de rutas para evitar imports excesivamente profundos
  //   typedRoutes: false,
  // },  
};

export default nextConfig;


