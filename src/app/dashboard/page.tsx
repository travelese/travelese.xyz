import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <h1>Hello, {user?.firstName}</h1>
      </div>
    </main>
  );
}
