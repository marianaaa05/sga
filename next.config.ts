// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
  
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};

export default nextConfig;

export const headers = async () => [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Permissions-Policy',
        value: 'compute-pressure=()' // Desactiva compute-pressure
      }
    ]
  }
];
