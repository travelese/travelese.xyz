import * as React from "react";
import { redirect } from "next/navigation";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/lib/auth/Provider";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  const session = await getUserAuth();
  if (!session) {
    redirect("/sign-in");
  }

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
