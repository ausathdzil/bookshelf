import { auth } from '@/auth';
import BookDetails from '@/components/dashboard/books/book-details';
import BookDetailsSkeleton from '@/components/skeletons/book-details-skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { getBookById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { bookId: string } }) {
  const session = await auth();
  const user = session?.user;
  const book = await getBookById(params.bookId, user?.id as string);

  if (!book.length) {
    return notFound();
  }

  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 px-44">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/books">Books</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Suspense
              fallback={<Skeleton className="w-[70px] h-[20px] rounded-lg" />}
            >
              <BreadcrumbLink asChild>
                <Link
                  className="text-foreground"
                  href={`/dashboard/books/${params.bookId}`}
                >
                  {book[0].title}
                </Link>
              </BreadcrumbLink>
            </Suspense>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<BookDetailsSkeleton />}>
        <BookDetails book={book[0]} />
      </Suspense>
    </section>
  );
}
