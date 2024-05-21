// File: /src/app/playground/layout.tsx
// Description: This file contains the layout component for the playground.

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  TriangleIcon,
  SquareTerminalIcon,
  FileCode2Icon,
  ShareIcon,
  LifeBuoyIcon,
  SquareUserIcon,
  BookIcon,
  Backpack,
  User,
  Layers3,
} from "lucide-react";
import ModeToggle from "@/components/mode-toggle";

const PlaygroundLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button aria-label="Home" size="icon" variant="outline">
            <Link href="/playground">
              <Layers3 className="size-5" />
            </Link>
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Travelese AI"
                  className="rounded-lg bg-muted"
                  size="icon"
                  variant="ghost"
                >
                  <Link href="/playground/chat">
                    <SquareTerminalIcon className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Travelese AI
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="API"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <FileCode2Icon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Documentation"
                  className="rounded-lg"
                  size="icon"
                  variant="ghost"
                >
                  <BookIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
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
                <Link href="/login">
                  Login
                </Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Playground</h1>
        <Button
          className="ml-auto gap-1.5 text-sm"
          size="default"
          variant="outline"
        >
          <ShareIcon className="size-4" />
          Share
        </Button>
        <ModeToggle />
      </header>
      {children}
    </div>
  );
};

export default PlaygroundLayout;