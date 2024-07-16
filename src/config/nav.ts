import { LucideIcon, Ticket } from "lucide-react";
import {
  HomeIcon,
  TerminalSquareIcon,
  SettingsIcon,
  User,
  CreditCardIcon,
  TicketIcon,
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
  { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/dashboard/ai", icon: TerminalSquareIcon, label: "Travelese AI" },
  { href: "/dashboard/orders", icon: TicketIcon, label: "Orders" },
];

export const bottomNavItems: SidebarLink[] = [
  { href: "/dashboard/account", icon: User, label: "Account" },
  { href: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
  {
    href: "/dashboard/account/billing",
    icon: CreditCardIcon,
    label: "Billing",
  },
];

export const defaultLinks: SidebarLink[] = [...topNavItems, ...bottomNavItems];

export const additionalLinks: AdditionalLinks[] = [];
