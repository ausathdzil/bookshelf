import { auth } from '@/auth';
import CreateBookForm from '@/components/forms/create-book-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { fetchBookByISBN } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function OpenLibraryBook({ query }: { query: string }) {
  const session = await auth();
  const user = session?.user;

  const book = await fetchBookByISBN(query);

  return (
    <>
      {book && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-[225px] h-[350px]">
            {book.cover ? (
              <Image
                src={book.cover.large}
                alt={book.title}
                className="rounded-tr-sm rounded-br-sm"
                fill
              />
            ) : (
              <div className="p-4 text-center w-full h-full rounded-md bg-muted flex flex-col justify-center items-center gap-2">
                <h1 className="text-xl font-bold">{book.title}</h1>
                <p className="text-base text-muted-foreground">
                  {book.authors &&
                    book.authors.map((author) => author.name).join(', ')}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <article className="space-y-1 w-[300px]">
              <h1 className="text-lg font-bold">{book.title}</h1>
              {book.authors && (
                <p className="text-base text-muted-foreground">
                  {book.authors.map((author) => author.name).join(', ')}
                </p>
              )}
              {book.subjects && (
                <p>
                  {book.subjects
                    .slice(0, 4)
                    .map((subject) => subject.name)
                    .join(', ')}
                </p>
              )}
              {book.number_of_pages && <p>{book.number_of_pages} pages</p>}
              {book.url && (
                <Link
                  href={book.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  More Info
                </Link>
              )}
            </article>
            {session && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add book</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add book</DialogTitle>
                    <DialogDescription>
                      Add {book.title} to your bookshelf.
                    </DialogDescription>
                  </DialogHeader>
                  <CreateBookForm
                    userId={user?.id as string}
                    OpenLibraryBook={book}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </>
  );
}
