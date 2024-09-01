import { auth } from '@/auth';
import { LibraryBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <section className="flex items-center gap-8">
        <LibraryBig className="w-24 h-24" />
        <article className="flex flex-col item-start text-xl gap-2">
          <h1 className="text-3xl font-bold">Welcome to Bookshelf</h1>
          <p>
            Keep track of your books and never forget what you&apos;ve read.
          </p>
        </article>
      </section>
      <section className="w-full flex flex-col justify-center items-center px-36 gap-8">
        <div className="relative w-[800px] h-[400px]">
          <Image
            src="/dashboard-example.png"
            alt="Dashboard example"
            className="rounded-lg border-2 border-gray-200 object-cover object-top"
            priority={true}
            fill
          />
        </div>
        {!session ? (
          <p className="text-base text-center">
            <span className="text-blue-500 hover:underline">
              <Link href="/signin">Sign in</Link>
            </span>{' '}
            to get started.
          </p>
        ) : (
          <p className="text-base text-center">
            <span className="text-blue-500 hover:underline">
              <Link href="/dashboard">Go to dashboard</Link>
            </span>{' '}
            to get started.
          </p>
        )}
      </section>
    </>
  );
}
