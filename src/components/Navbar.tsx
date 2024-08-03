"use client";

import React from "react";
import Link from "next/link";
import { useNavbar } from "@/hooks/useNavbar";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { Layers3, MenuIcon, ChevronDownIcon } from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-select";

export default function Navbar() {
  const { user } = useUser();
  const { commandOpen, toggleCommand } = useNavbar();

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
        <Button>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Sheet>
              <SheetTrigger asChild>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          className="h-16 w-16 rounded-lg"
                          src={user?.imageUrl ?? ""}
                          alt={`${user?.firstName}'s avatar`}
                        />
                        <AvatarFallback>
                          <span className="text-lg font-semibold text-primary-foreground">
                            {`${user?.firstName?.charAt(0)?.toUpperCase() ?? ""}${user?.lastName?.charAt(0)?.toUpperCase() ?? ""}`}
                          </span>
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {user?.fullName}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="p-4 space-y-4">
                  <Separator className="my-4" />
                  <a href="#" className="block text-lg font-medium">
                    Inbox
                  </a>
                  <a href="#" className="block text-lg font-medium">
                    Locked prices
                  </a>
                  <Collapsible className="grid gap-4">
                    <CollapsibleTrigger className="flex w-full items-center text-lg font-medium [&[data-state=open]>svg]:rotate-90">
                      Preferences
                      <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="-mx-4 grid gap-4 bg-muted p-4 rounded">
                        <a
                          href="/dashboard/settings"
                          className="block text-lg font-medium"
                        >
                          Account settings
                        </a>
                        <a href="#" className="block text-lg font-medium">
                          Saved travelers
                        </a>
                        <a href="#" className="block text-lg font-medium">
                          Privacy & Security
                        </a>
                        <a href="#" className="block text-lg font-medium">
                          Payment methods
                        </a>
                        <a href="#" className="block text-lg font-medium">
                          Billing addresses
                        </a>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <Separator className="my-4" />
                  <a href="#" className="block text-lg font-medium">
                    Help
                  </a>
                </div>
                <SheetFooter>
                  <SheetClose asChild></SheetClose>
                  <Button variant="outline">
                    <SignOutButton />
                  </Button>
                </SheetFooter>
                <div className="flex items-center justify-center p-4 space-x-4">
                  <a
                    href="https://www.linkedin.com/showcase/travelese/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <LinkedInLogoIcon className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/travelese.xyz/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <InstagramLogoIcon className="w-6 h-6" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </SignedIn>
        </Button>
      </div>
    </header>
  );
}
