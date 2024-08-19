import { auth } from '@/auth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getBookById } from '@/lib/data';
import Link from 'next/link';

export default async function Page({ params }: { params: { bookId: string } }) {
  const session = await auth();
  const user = session?.user;
  const book = await getBookById(params.bookId, user?.id as string);

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
            <BreadcrumbLink asChild>
              <Link
                className="text-foreground"
                href={`/dashboard/books/${params.bookId}`}
              >
                {book[0].title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full space-y-1.5">
        <h1 className="text-2xl font-bold">{book[0].title}</h1>
        <p className="text-muted-foreground">{book[0].author}</p>
      </div>
    </section>
  );
}
