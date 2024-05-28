"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
  Breadcrumb,
} from "@/components/ui/breadcrumb";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TriangleIcon,
  SquareTerminalIcon,
  FileCode2Icon,
  ShareIcon,
  LifeBuoyIcon,
  SquareUserIcon,
  BookIcon,
  Backpack,
  Triangle,
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
  PanelLeftIcon,
  SettingsIcon,
  BellIcon,
  User,
  Layers3,
} from "lucide-react";
import ModeToggle from "@/components/mode-toggle";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="grid w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button aria-label="Home" size="icon" variant="outline">
            <Link href="/dashboard">
              <Layers3 className="size-5" />
            </Link>
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Dashboard"
                  className="rounded-lg bg-muted"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard">
                    <HomeIcon className="size-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Orders"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/orders">
                    <ShoppingCartIcon className="size-5" />
                    <span className="sr-only">Orders</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Products"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/products">
                    <PackageIcon className="size-5" />
                    <span className="sr-only">Products</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Products"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="#">
                    <UsersIcon className="h-5 w-5" />
                    <span className="sr-only">Customers</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Products"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="#">
                    <LineChartIcon className="size-5" />
                    <span className="sr-only">Analytics</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Travelese"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/travel">
                    <Backpack className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Travelese
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Products"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/dashboard/settings">
                    <SettingsIcon className="size-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Help"
                  className="mt-auto rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <LifeBuoyIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Account"
                  className="mt-auto rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <SquareUserIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                <Link href="/login">Login</Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" size="icon" variant="outline">
              <PanelLeftIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xs" side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                href="#"
              >
                <Triangle className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Travelese</span>
              </Link>
              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                href="/dashboard"
              >
                <HomeIcon className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                href="/dashboard/orders"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Orders
              </Link>
              <Link
                className="flex items-center gap-4 px-2.5 text-foreground"
                href="/dashboard/products"
              >
                <PackageIcon className="h-5 w-5" />
                Products
              </Link>
              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                href="#"
              >
                <UsersIcon className="h-5 w-5" />
                Customers
              </Link>
              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                href="/dashboard/settings"
              >
                <LineChartIcon className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full top-0 z-10 h-[57px] items-center gap-1">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex-1 sm:flex-initial">
            <p className="text-sm text-muted-foreground">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </p>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Paris Fashion Week SS25</CommandItem>
                  <CommandItem>Formula 1 Moanco Grand-Prix</CommandItem>
                  <CommandItem>National Geographic</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
          <Button size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
