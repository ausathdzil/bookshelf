import BooksTableSection from '@/components/dashboard/books/books-table-section';
import BooksTableSkeleton from '@/components/skeletons/books-table-skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
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
              <Link
                className="text-foreground"
                href="/dashboard/books"
              >
                Books
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<BooksTableSkeleton />}>
        <BooksTableSection />
      </Suspense>
    </section>
  );
}
