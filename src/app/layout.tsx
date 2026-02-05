import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // If inter isn't installed I should avoid it or use local font, create-next-app includes generic font sometimes
// I'll stick to system sans for now or basic config, but Next usually provides a font import.
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diagnostic Platform",
  description: "AI-Powered Health Tracking & Diagnosis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen font-sans antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
