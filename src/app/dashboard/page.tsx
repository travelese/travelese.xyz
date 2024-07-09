import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {session ? (
        <pre className="bg-muted-50 p-4 rounded-sm shadow-sm break-all whitespace-break-spaces">
          Hey 👋🏽
          <br />
          {session.user.name}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
