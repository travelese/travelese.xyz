import { LucideIcon } from 'lucide-react'
import {
  HomeIcon,
  TerminalSquareIcon,
  SettingsIcon,
  LifeBuoyIcon,
  User,
  CreditCardIcon,
  BarChartIcon,
  MailIcon,
} from 'lucide-react'

export interface SidebarLink {
  href: string
  label: string
  icon: LucideIcon
}

export type AdditionalLinks = {
  label: string
  links: SidebarLink[]
}

export const topNavItems: SidebarLink[] = [
  { href: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { href: '/dashboard/ai', icon: TerminalSquareIcon, label: 'Travelese AI' },
  { href: '/dashboard/charts', icon: BarChartIcon, label: 'Charts' },
  { href: '/dashboard/resend', icon: MailIcon, label: 'Resend' },
]

export const bottomNavItems: SidebarLink[] = [
  { href: '/dashboard/account', icon: User, label: 'Account' },
  { href: '/dashboard/settings', icon: SettingsIcon, label: 'Settings' },
  {
    href: '/dashboard/account/billing',
    icon: CreditCardIcon,
    label: 'Billing',
  },
  { href: '#', icon: LifeBuoyIcon, label: 'Help' },
]

export const defaultLinks: SidebarLink[] = [...topNavItems, ...bottomNavItems]

export const additionalLinks: AdditionalLinks[] = []
