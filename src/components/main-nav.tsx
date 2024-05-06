import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Auth } from "@/components/login-form";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/login-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export async function MainNav() {
  const session = await auth();

  const userName = session.user.name;
  const userImage = session.user.image;

  return (
    <div className="bg-white dark:bg-gray-950 shadow border-b">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <nav className="flex items-center justify-between">
          {session ? (
            <Link
              className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white
              to-gray-500"
              href="/"
            >
              Travelese for Business
            </Link>
          ) : (
            <Link
              className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white
              to-gray-500"
              href="/"
            >
              Travelese
            </Link>
          )}
          <div className="flex items-center space-x-4">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/flights"
            >
              Flights
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/hotels"
            >
              Hotels
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/#contact"
            >
              Get in Touch
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="32"
                        src={userImage}
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
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogoutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Auth />
            )}
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
