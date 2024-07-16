import * as React from "react";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const user = await getUserAuth();
  if (!user.session) throw new Error("Unauthorized");

  const { session } = await getUserAuth();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <pre className="bg-muted-50 p-4 rounded-sm shadow-sm break-all whitespace-break-spaces">
        Hey 👋🏽
        <br />
        {session?.user.name}
      </pre>
    </main>
  );
}
