import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@subframe/core";
import { TourProvider } from "@/components/tour/tour-provider";
import { TourOverlay } from "@/components/tour/tour-overlay";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
  title: "Dynamic Pricing — Design Prototype",
  description:
    "A product design prototype for a pricing experimentation tool. Looks real, entirely fictional. Made by a designer who cares about the details.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Dynamic Pricing — Design Prototype",
    description:
      "A product design prototype for a pricing experimentation tool. Looks real, entirely fictional. Made by a designer who cares about the details.",
    siteName: "Design Prototype by Saurabh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
      >{`
        if(location.hostname!=="localhost"){
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "v8mtbu38mt");
        }
      `}</Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            <TourProvider>
              <div className="flex h-screen bg-neutral-50">
                <Sidebar />
                <MainContent>{children}</MainContent>
              </div>
              <TourOverlay />
            </TourProvider>
          </TooltipProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
