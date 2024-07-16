"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const breadcrumbItems = [
    {
      label: "Search",
      href: "/travel/fly/search",
    },
    {
      label: "Book",
      href: "/travel/fly/book",
    },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <header>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {pathname === item.href ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}
