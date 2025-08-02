import type { Metadata } from "next";
import localFonts from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/providers/toaster-provider";

const geistSans = localFonts({
  src: [
    {
      path: "../public/fonts/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plataforma LMS - Semilleros AUNAR Pasto",
  description: "Creada para los Semilleros de Investigación AUNAR - Pasto",
  icons: [
    {
      rel: "icon",
      url: "/SKAHverse1.png",
      type: "image/png",
      sizes: "128x128",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
      }
      signInForceRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
      }
      signUpFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
      }
      signUpForceRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL
      }
      appearance={{
        variables: {
          colorPrimary: "#6d28d9",
          colorBackground: "#f9f9f9",
          colorText: "#1e1e1e",
        },
        elements: {
          card: "rounded-xl shadow-lg",
          headerTitle: "text-2xl",
        },
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
