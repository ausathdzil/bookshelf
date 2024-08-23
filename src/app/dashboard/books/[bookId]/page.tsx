import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getBookById } from '@/lib/data';
import clsx from 'clsx';
import { PencilIcon } from 'lucide-react';
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
      <div className="w-full flex justify-between items-start">
        <article className="space-y-1">
          <h1 className="text-2xl font-bold">{book[0].title}</h1>
          <p className="text-muted-foreground">{book[0].author}</p>
          <p className="text-muted-foreground">{book[0].genre}</p>
          <div className="space-x-2">
            <Badge
              className={clsx({
                'bg-blue-500': book[0].status === 'Completed',
                'bg-green-500': book[0].status === 'Reading',
              })}
            >
              {book[0].status}
            </Badge>
            <Badge
              className={clsx({
                'border-yellow-400': book[0].rating && book[0].rating === 5,
                'border-purple-400': book[0].rating && book[0].rating < 5,
                'border-red-400': book[0].rating && book[0].rating < 2,
              })}
              variant="outline"
            >
              {book[0].rating === 0 ? 'Unrated' : `${book[0].rating} ⭐`}
            </Badge>
          </div>
        </article>
        <Link href={`/dashboard/books/${book[0].id}/edit`}>
          <Button
            className="flex gap-4"
            variant="outline"
          >
            <span>Edit Book</span>
            <PencilIcon size={16} />
          </Button>
        </Link>
      </div>
      <div className="w-full space-y-4">
        <p>{book[0].description}</p>
        <div className="w-1/2 flex gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Volumes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress
                className={
                  book[0].status === 'Completed'
                    ? '[&>*]:bg-blue-500'
                    : '[&>*]:bg-emerald-500'
                }
                value={(book[0].volumesCompleted / book[0].volumes) * 100}
              />
              <p>
                {book[0].volumesCompleted} / {book[0].volumes}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress
                className={
                  book[0].status === 'Completed'
                    ? '[&>*]:bg-blue-500'
                    : '[&>*]:bg-emerald-500'
                }
                value={(book[0].pagesRead / book[0].pages) * 100}
              />
              <p>
                {book[0].pagesRead} / {book[0].pages}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
