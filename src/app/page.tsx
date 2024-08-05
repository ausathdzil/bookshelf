import { auth, signOut } from '@/auth';
import Link from 'next/link';

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (session) {
    return (
      <>
        <h1>Home</h1>
        <p>Signed in as {session?.user?.email}</p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Link href={`/dashboard/${userId}`}>Dashboard</Link>
        <SignOut />
      </>
    );
  }

  return (
    <>
      <h1>Home</h1>
      <Link href="/signin">Sign In</Link>
    </>
  );
}
