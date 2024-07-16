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
      <body className={GeistSans.className}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
