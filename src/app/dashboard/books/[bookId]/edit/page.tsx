import { auth } from '@/auth';
import BookProgressCard from '@/components/dashboard/books/book-progress-card';
import UpdateBookForm from '@/components/forms/update-book-form';
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
      <div className="w-full space-y-1.5">
        <h1 className="text-2xl font-bold">{book[0].title}</h1>
        <p className="text-muted-foreground">{book[0].author}</p>
        <p className="text-muted-foreground">{book[0].genre}</p>
        <div className="flex w-full gap-8">
          <div className="w-1/2 space-y-4">
            <h1>Your Progress</h1>
            <BookProgressCard book={book[0]} />
          </div>
          <UpdateBookForm
            id={params.bookId}
            userId={user?.id as string}
            book={book[0]}
          />
        </div>
      </div>
    </section>
  );
}
