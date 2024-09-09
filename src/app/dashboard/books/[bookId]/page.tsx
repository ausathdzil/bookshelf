import BookBreadcrumb from '@/components/dashboard/books/book-breadcrumb';
import BookDetails from '@/components/dashboard/books/book-details';
import BookDetailsSkeleton from '@/components/skeletons/book-details-skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page({ params }: { params: { bookId: string } }) {
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
            <BookBreadcrumb bookId={params.bookId} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<BookDetailsSkeleton />}>
        <BookDetails bookId={params.bookId} />
      </Suspense>
    </section>
  );
}
