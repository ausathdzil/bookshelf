import BookCard from '@/components/dashboard/overview/book-card';
import CreateBookForm from '@/components/forms/create-book-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/db/schema';
import { ArrowRight, PlusIcon } from 'lucide-react';
import { User } from 'next-auth';
import Link from 'next/link';

export default function BooksSection({
  user,
  books,
}: {
  user: User | undefined;
  books: SelectBook[];
}) {
  return (
    <>
      <h1 className="text-3xl text-center font-bold">Books</h1>
      <Separator />
      <ul className="w-full grid grid-cols-5 gap-6">
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
          <Dialog>
            <DialogTrigger>
              <Card className="w-52 h-72 flex flex-col justify-center items-center text-center">
                <CardHeader>
                  <CardTitle>Add more books</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlusIcon size={32} />
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add book</DialogTitle>
                <DialogDescription>
                  Add a book to your bookshelf.
                </DialogDescription>
              </DialogHeader>
              <CreateBookForm userId={user?.id as string} />
            </DialogContent>
          </Dialog>
        </li>
      </ul>
      <div className="w-full text-right">
        <Link href="dashboard/books">
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
