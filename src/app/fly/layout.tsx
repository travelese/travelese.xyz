import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/main-nav";

const FlyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
      <>
        <MainNav />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <header>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Search</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Review</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Book</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </div>
        <Toaster />
      </>
    );
};

export default FlyLayout;
