import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}!</p>
    </>
  );
}
