import { auth } from '@/auth';
import { columns } from '@/components/dashboard/books/books-columns';
import BooksTable from '@/components/dashboard/books/books-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getBooksByUserId } from '@/queries/select';
import Link from 'next/link';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const books = await getBooksByUserId(user?.id as string);

  const formattedBooks = books.map((book) => ({
    ...book,
    pagesProgress: `${book.pagesRead} / ${book.pages}` || null,
    volumesProgress: `${book.volumesCompleted} / ${book.volumes}` || null,
    updatedAt: book.updatedAt.toISOString().split('T')[0] || '',
  }));

  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 px-44">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${user?.id}/dashboard`}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="text-foreground"
                href={`/${user?.id}/dashboard/books`}
              >
                Books
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">{user?.name}&apos;s Bookshelf</h1>
      <BooksTable
        columns={columns}
        data={formattedBooks}
      />
    </section>
  );
}
