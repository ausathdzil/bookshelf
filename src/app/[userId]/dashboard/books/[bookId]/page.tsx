import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getBooksByUserId } from '@/queries/select';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { userId: string; bookId: string };
}) {
  const books = await getBooksByUserId(params.userId);
  const currentBook = books.find((book) => book.id === params.bookId);

  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 px-44">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${params.userId}/dashboard`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${params.userId}/dashboard/books`}>Books</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="text-foreground"
                href={`/${params.userId}/dashboard/books/${params.bookId}`}
              >
                {currentBook?.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full space-y-1.5">
        <h1 className="text-2xl font-bold">{currentBook?.title}</h1>
        <p className="text-muted-foreground">{currentBook?.author}</p>
      </div>
    </section>
  );
}
