import * as React from "react";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-57px)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header>
            <DashboardBreadcrumb />
          </header>
          <main>{children}</main>
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}
