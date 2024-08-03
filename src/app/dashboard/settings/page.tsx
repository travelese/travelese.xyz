import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { UserSettings } from "@/components/settings/UserSettings";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { CodeSwitcher } from "@/components/settings/CodeSwitcher";

export default async function Home() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return (
    <main className="max-w-[75rem] w-full mx-auto">
      <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
        <div>
          <header className="flex items-center justify-between w-full h-16 gap-4">
            <div className="flex items-center gap-2">
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    organizationPreviewAvatarBox: "size-6",
                  },
                }}
              />
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "size-6",
                  },
                }}
              />
            </div>
          </header>
          <UserSettings />
        </div>
        <div className="pt-[3.5rem]">
          <CodeSwitcher />
        </div>
      </div>
    </main>
  );
}
