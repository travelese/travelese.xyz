"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { topNavItems, bottomNavItems } from "@/config/nav";

const SidebarItems = () => {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: (typeof topNavItems)[0] }) => (
    <Tooltip key={item.href}>
      <TooltipTrigger asChild>
        <Button
          aria-label={item.label}
          className={`rounded-lg ${pathname === item.href ? "bg-muted" : ""}`}
          size="icon"
          variant="ghost"
        >
          <Link href={item.href}>
            <item.icon
              className={`size-5 ${
                pathname === item.href ? "text-primary" : ""
              }`}
            />
            <span className="sr-only">{item.label}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <nav className="grid gap-1 p-2">
        {topNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default SidebarItems;
