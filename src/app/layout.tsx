import * as React from "react";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { PHProvider } from "@/lib/analytics/providers";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";

const PostHogPageView = dynamic(
  () => import("@/lib/analytics/PostHogPageView"),
  {
    ssr: false,
  },
);

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <PHProvider>
          <body className={GeistSans.className}>
            <PostHogPageView />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
