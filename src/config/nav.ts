import {
  LucideIcon,
  TerminalSquareIcon,
  SettingsIcon,
  LayoutDashboardIcon,
} from "lucide-react";

export interface SidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export type AdditionalLinks = {
  label: string;
  links: SidebarLink[];
};

export const topNavItems: SidebarLink[] = [
  { href: "/dashboard", icon: LayoutDashboardIcon, label: "Dashboard" },
  { href: "/dashboard/agent", icon: TerminalSquareIcon, label: "Travel Agent" },
];

export const bottomNavItems: SidebarLink[] = [
  { href: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
];

export const defaultLinks: SidebarLink[] = [...topNavItems, ...bottomNavItems];

export const additionalLinks: AdditionalLinks[] = [];
