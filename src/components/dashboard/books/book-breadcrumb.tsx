import { auth } from '@/auth';
import { BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { getBookById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function BookBreadcrumb({ bookId }: { bookId: string }) {
  const session = await auth();
  const user = session?.user;
  const book = await getBookById(bookId, user?.id as string);

  if (!book.length) {
    notFound();
  }

  return (
    <>
      <Suspense
        fallback={<Skeleton className="w-[70px] h-[20px] rounded-lg" />}
      >
        <BreadcrumbLink asChild>
          <Link
            className="text-foreground"
            href={`/dashboard/books/${bookId}`}
          >
            {book[0].title}
          </Link>
        </BreadcrumbLink>
      </Suspense>
      {}
    </>
  );
}
