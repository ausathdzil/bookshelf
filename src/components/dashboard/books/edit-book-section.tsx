import { auth } from '@/auth';
import BookProgressCard from '@/components/dashboard/books/book-progress-card';
import UpdateBookForm from '@/components/forms/update-book-form';
import { Separator } from '@/components/ui/separator';
import { getBookById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditBookSection({ bookId }: { bookId: string }) {
  const session = await auth();
  const user = session?.user;
  const book = await getBookById(bookId, user?.id as string);

  if (!book.length) {
    notFound();
  }

  return (
    <div className="w-full space-y-4">
      <article className="space-y-1">
        <h1 className="text-2xl font-bold">{book[0].title}</h1>
        <p className="text-muted-foreground">{book[0].author}</p>
        <p className="text-muted-foreground">{book[0].genre}</p>
      </article>
      <Separator />
      <div className="flex w-full gap-8">
        <div className="w-1/2 space-y-4">
          <h1>Your Progress</h1>
          <BookProgressCard book={book[0]} />
        </div>
        <UpdateBookForm
          id={bookId}
          userId={user?.id as string}
          book={book[0]}
        />
      </div>
    </div>
  );
}
