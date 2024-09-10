import BookBreadcrumb from '@/components/dashboard/books/book-breadcrumb';
import EditBookSection from '@/components/dashboard/books/edit-book-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
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
      <EditBookSection bookId={params.bookId} />
    </section>
  );
}
