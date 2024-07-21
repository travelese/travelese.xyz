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
          className={`w-full justify-center ${pathname === item.href ? "bg-muted" : ""}`}
          size="icon"
          variant="ghost"
        >
          <Link href={item.href}>
            <item.icon
              className={`h-5 w-5 ${
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
    <div className="flex flex-col h-full py-4">
      <div className="space-y-2">
        {topNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
      <div className="mt-auto space-y-2">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
