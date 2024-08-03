import * as React from "react";
import SidebarItems from "@/components/SidebarItems";
import { TooltipProvider } from "@/components/ui/tooltip";

const Sidebar = async () => {
  return (
    <aside className="w-[56px] h-full border-r bg-background flex flex-col">
      <TooltipProvider>
        <SidebarItems />
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
