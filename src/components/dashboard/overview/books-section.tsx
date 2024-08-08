import BookCard from '@/components/dashboard/overview/book-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/schema';
import { ArrowRight, PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function BooksSection({
  user,
  books,
}: {
  user: any;
  books: SelectBook[];
}) {
  return (
    <>
      <h1 className="text-3xl text-center font-bold">Books</h1>
      <Separator />
      <ul className="w-full grid grid-cols-5">
        {books.length > 0 && (
          <>
            {books.slice(0, 9).map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </>
        )}
        <li>
          <Card className="w-52 h-72 flex flex-col justify-center items-center text-center">
            <CardHeader>
              <CardTitle>Add more books</CardTitle>
            </CardHeader>
            <CardContent>
              <PlusIcon size={32} />
            </CardContent>
          </Card>
        </li>
      </ul>
      <div className="w-full text-right">
        <Link href={`/${user?.id}/dashboard/books`}>
          <Button
            className="text-lg"
            variant="link"
          >
            View all books{' '}
            <span className="ml-2">
              <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>
      <Separator />
    </>
  );
}
