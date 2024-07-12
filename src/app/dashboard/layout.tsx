import * as React from "react";
import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/lib/auth/Provider";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  if (session?.session) redirect("/sign-in");

  return (
    <main>
      <NextAuthProvider>
        <div className="grid w-full pl-[56px] min-h-screen">
          <Sidebar />
          <main>{children}</main>
        </div>
      </NextAuthProvider>
      <Toaster richColors />
    </main>
  );
}
