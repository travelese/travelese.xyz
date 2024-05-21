// File: /src/components/main-nav.tsx
// Description: This file contains the main navigation component for the dashboard.

"use client"; 

import React from "react";
import Link from "next/link";
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  Package2Icon,
  MenuIcon,
  User,
  Triangle,
  Layers3,
} from "lucide-react";

const MainNav = () => {
  // const session = await auth();

  // const userName = session?.user?.name;
  // const userImage = session?.user?.image;

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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="/"
        >
          <Layers3 className="size-6" />
          <h2 className="text-2xl">Travelese</h2>
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Fly
        </Link>
         <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Sail
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Ride
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Drive
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Stay
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              className="flex items-center gap-2 text-lg font-semibold"
              href="#"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link className="hover:text-foreground" href="#">
              Dashboard
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="#"
            >
              Orders
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="#"
            >
              Products
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="#"
            >
              Customers
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="#"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
        {/* <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form> */}
        {/* {session ? (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <Image
                    alt="Avatar"
                    height="32"
                    src={userImage ?? "/placeholder-user.jpg"}
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
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
        )} */}
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
  );
};

export default MainNav;
