import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import the Footer component
import { Recursive } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import KindeWrapper from "@/components/KindeWrapper";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnakeCase",
  description: "Next Generation Custom Phone Cases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <KindeWrapper>
          <Providers>
            <Navbar />
            <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
              <div className="flex-1 flex flex-col h-full">
                {children}
                {/* <Providers>{children}</Providers> */}
              </div>
              <Footer />
            </main>
            <Toaster />
          </Providers>
        </KindeWrapper>
      </body>
    </html>
  );
}
