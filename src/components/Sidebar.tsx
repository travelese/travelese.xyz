import * as React from "react";
import { getUserAuth } from "@/lib/auth/utils";
import SidebarItems from "@/components/SidebarItems";
import { TooltipProvider } from "@/components/ui/tooltip";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="w-[56px] h-full border-r bg-background flex flex-col">
      <TooltipProvider>
        <SidebarItems />
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
