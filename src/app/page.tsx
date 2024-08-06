import { auth } from '@/auth';
import DashboardExample from '@/components/home/dashboard-example';
import { LibraryBig } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <section className="flex items-start gap-8">
        <LibraryBig className="w-24 h-24" />
        <div className="flex flex-col item-start text-xl gap-2">
          <h1 className="text-3xl font-bold">Welcome to Bookshelf</h1>
          <p>
            Keep track of your books and never forget what you&apos;ve read.
          </p>
          {!session && (
            <p className="text-base">
              <span className="text-blue-500 hover:underline">
                <Link href="/signin">Sign in</Link>
              </span>{' '}
              to get started.
            </p>
          )}
        </div>
      </section>
      <DashboardExample />
    </>
  );
}
