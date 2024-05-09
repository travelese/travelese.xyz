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
import { SettingsIcon, CircleHelpIcon } from "lucide-react";

export async function MainNav() {
  const session = await auth();

  const userName = session?.user?.name;
  const userImage = session?.user?.image;

  return (
    <div className="shadow border-b">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <nav className="flex items-center justify-between">
          <Link
            className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-200
              to-blue-950"
            href="/"
          >
            <h2>{session ? "Travelese for Business" : "Travelese"}</h2>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <CircleHelpIcon />
            </Button>
            {session ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <SettingsIcon />
                </Button>
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
