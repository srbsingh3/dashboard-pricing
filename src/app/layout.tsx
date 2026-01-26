import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@subframe/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPS - Dynamic Pricing Service",
  description: "Configure and manage dynamic pricing experiments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <TooltipProvider delayDuration={300}>
          <div className="flex h-screen bg-neutral-100">
            <Sidebar />
            <MainContent>{children}</MainContent>
          </div>
        </TooltipProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
