import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";
import ParticlesBackground from "./particles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WealthWise!",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&family=Kufam:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      />

      <body>
        <ParticlesBackground />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
