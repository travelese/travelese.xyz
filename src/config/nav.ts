import {
  LucideIcon,
  TerminalSquareIcon,
  TicketIcon,
  BugIcon,
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
  { href: "/dashboard/ai", icon: TerminalSquareIcon, label: "Travelese AI" },
  { href: "/dashboard/orders", icon: TicketIcon, label: "Orders" },
];

export const bottomNavItems: SidebarLink[] = [
  { href: "/dashboard/admin", icon: BugIcon, label: "Admin" },
  { href: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
];

export const defaultLinks: SidebarLink[] = [...topNavItems, ...bottomNavItems];

export const additionalLinks: AdditionalLinks[] = [];
