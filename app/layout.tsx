import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
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

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Plataforma LMS - Cursos AUNAR Pasto",
  description:
    "Creada por estudiantes de Semilleros de Investigación de Aunar Pasto",
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
          className={`${geistSans.variable}antialiased`}
        >
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
