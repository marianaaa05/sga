// import type { Metadata } from "next";
// // import { Geist, Geist_Mono } from "next/font/google";
// import localFonts from "next/font/local";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ToasterProvider } from "@/components/providers/toaster-provider";

// const geistSans = localFonts({
//   src: [
//     {
//       path: '../public/fonts/Geist-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/Geist-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: "--font-geist-sans",
//   display: "swap",
// });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// export const metadata: Metadata = {
//   title: "Plataforma LMS - Cursos AUNAR Pasto",
//   description:
//     "Creada por estudiantes de Semilleros de Investigación de Aunar Pasto",
// };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <ClerkProvider>
// //       <html lang="en">
// //         <body
// //           className={`${geistSans.variable}antialiased`}
// //         >
// //           <ToasterProvider />
// //           {children}
// //         </body>
// //       </html>
// //     </ClerkProvider>
// //   );
// // }


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider
//       signInFallbackRedirectUrl="/dashboard"
//       signInForceRedirectUrl="/dashboard"
//     >
//       <html lang="es" suppressHydrationWarning>
//         <body className={`${geistSans.variable} antialiased`}>
//           <ToasterProvider />
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import type { Metadata } from "next";
import localFonts from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/providers/toaster-provider";

const geistSans = localFonts({
  src: [
    {
      path: '../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plataforma LMS - Cursos AUNAR Pasto",
  description: "Creada por estudiantes de Semilleros de Investigación de Aunar Pasto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL}
      signInForceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}
      signUpFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL}
      signUpForceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL}
      appearance={{
        variables: {
          colorPrimary: "#6d28d9", // Color morado para coincidir con tu tema
        },
        elements: {
          formButtonPrimary: "bg-purple-700 hover:bg-purple-800",
          footerActionLink: "text-purple-700 hover:text-purple-800",
        }
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <body className={`${geistSans.variable} antialiased`}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}