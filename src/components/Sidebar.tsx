import * as React from "react";
import Link from "next/link";
import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import SidebarItems from "@/components/SidebarItems";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="inset-y fixed left-0 z-20 flex min-h-screen flex-col border-r">
      <nav className="gap-1 p-2">
        <TooltipProvider>
          <SidebarItems />
          <UserDetails session={session} />
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/dashboard/account">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="border-border border-2 text-muted-foreground">
              {user.name
                ? user.name
                    .split(" ")
                    .map((word) => word[0].toUpperCase())
                    .join("")
                : "~"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
