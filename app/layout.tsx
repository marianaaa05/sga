import type { Metadata } from "next";
 import { Geist, Geist_Mono } from "next/font/google";
 import "./globals.css";
 import { ClerkProvider } from "@clerk/nextjs";
 // .. en cambio de @ PROVICIONAL
 //
 import { ToasterProvider } from "../components/providers/toaster-provider";
 
 const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
 });
 
 const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
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
     <ClerkProvider>
     <html lang="en">
       <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
       >
        <ToasterProvider />
         {children}
       </body>
     </html>
     </ClerkProvider>
   );
 }