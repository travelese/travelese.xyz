"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SettingsIcon, CircleHelpIcon } from "lucide-react";

const links = [
  {
    name: "Logo",
    href: "/",
    icon: CircleHelpIcon,
  },
  {
    name: "Help",
    href: "#",
    icon: CircleHelpIcon,
  },
  {
    name: "Settings",
    href: "#",
    icon: SettingsIcon,
  },
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
              "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium",
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
