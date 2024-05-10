"use client";

import {
  BookIcon,
  MoveHorizontalIcon,
  SettingsIcon,
  UsersIcon,
  ViewIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ViewIcon,
  },
  {
    name: "Bookings",
    href: "/dashboard/bookings",
    icon: BookIcon,
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: UsersIcon,
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    icon: WalletIcon,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: MoveHorizontalIcon,
  }
];

export default function SideNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
              {
                "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
