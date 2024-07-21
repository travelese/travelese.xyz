import * as React from "react";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextAuthProvider from "@/lib/auth/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { PHProvider } from "./_analytics/providers";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("./_analytics/PostHogPageView"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Travelese",
  description: "Smartest way to book your next trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PHProvider>
        <body className={GeistSans.className}>
          <NextAuthProvider>
            <PostHogPageView />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
          </NextAuthProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </body>
      </PHProvider>
    </html>
  );
}
