import Link from "next/link";

import { auth, signOut } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <>
            <span>{session.user?.email}</span>
            <button>Sign out</button>
          </>
        </form>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
