import EditBookSection from '@/components/dashboard/books/edit-book-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { SelectBook } from '@/db/schema';
import { getBookById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: { bookId: SelectBook['id'] };
}) {
  const book = await getBookById(params.bookId);

  if (!book.length) {
    notFound();
  }

  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 sm:px-44">
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
                <Link href={`/dashboard/books/${params.bookId}`}>
                  {book[0].title}
                </Link>
              </BreadcrumbLink>
            </Suspense>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Suspense
              fallback={<Skeleton className="w-[70px] h-[20px] rounded-lg" />}
            >
              <BreadcrumbLink asChild>
                <Link
                  className="text-foreground"
                  href={`/dashboard/books/${params.bookId}/edit`}
                >
                  Edit
                </Link>
              </BreadcrumbLink>
            </Suspense>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EditBookSection
        book={book[0]}
        userId={book[0].userId}
      />
    </section>
  );
}
