import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medanta - The Medicity",
  description: "India's leading multi-specialty medical institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
