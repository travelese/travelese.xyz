"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useNavbar } from "@/hooks/useNavbar";
import ModeToggle from "@/components/ModeToggle";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Layers3, User } from "lucide-react";
import { defaultLinks } from "@/config/nav";

export default function Navbar() {
  const { commandOpen, toggleCommand } = useNavbar();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="h-[57px] sticky top-0 z-10 flex items-center justify-between gap-1 border-b bg-background px-4">
      <Link
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        href="/"
      >
        <Layers3 className="size-6" />
        <h2 className="text-2xl">Travelese</h2>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <p className="text-sm text-muted-foreground">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
          <CommandDialog open={commandOpen} onOpenChange={toggleCommand}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Paris Fashion Week SS25</CommandItem>
                <CommandItem>Formula 1 Monaco Grand-Prix</CommandItem>
                <CommandItem>National Geographic</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="p-0 overflow-hidden"
            >
              {session ? (
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={session.user?.image || undefined} />
                  <AvatarFallback className="border-border border-2 text-muted-foreground">
                    {session.user?.name
                      ? session.user.name
                          .split(" ")
                          .map((word) => word[0].toUpperCase())
                          .join("")
                      : "~"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {session ? (
              <>
                <DropdownMenuGroup>
                  {defaultLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={
                          pathname === link.href ? "font-semibold" : ""
                        }
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    void signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/sign-in">Sign in</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}
