import { auth } from '@/auth';
import BookProgressCard from '@/components/dashboard/books/book-progress-card';
import { Button } from '@/components/ui/button';
import { getBookById } from '@/lib/data';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BookDetails({ bookId }: { bookId: string }) {
  const session = await auth();
  const user = session?.user;
  const book = await getBookById(bookId, user?.id as string);

  if (!book.length) {
    notFound();
  }

  return (
    <>
      <section className="w-full flex justify-between items-start">
        <div className="w-full space-y-4">
          <article className="space-y-1">
            <h1 className="text-2xl font-bold">{book[0].title}</h1>
            <p className="text-muted-foreground">{book[0].author}</p>
            <p className="text-muted-foreground">{book[0].genre}</p>
          </article>
        </div>
        <Link href={`/dashboard/books/${book[0].id}/edit`}>
          <Button
            className="flex gap-4"
            variant="outline"
          >
            <span>Edit Book</span>
            <PencilIcon size={16} />
          </Button>
        </Link>
      </section>
      <section className="w-full space-y-4">
        <p>{book[0].description}</p>
        <BookProgressCard book={book[0]} />
      </section>
    </>
  );
}
