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

  if (!session) {
    return (
      <>
        <h1>Home</h1>
        <Link href="/signin">Sign In</Link>
      </>
    );
  }

  return (
    <>
      <h1>Home</h1>
      <p>Signed in as {session.user?.email}</p>
      <Link href={`/${session?.user?.id}/dashboard`}>Dashboard</Link>
      <SignOut />
    </>
  );
}
