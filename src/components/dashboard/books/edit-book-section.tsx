import BookProgressCard from '@/components/dashboard/books/book-progress-card';
import UpdateBookForm from '@/components/forms/update-book-form';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/db/schema';

export default function EditBookSection({ book }: { book: SelectBook }) {
  return (
    <div className="w-full space-y-4">
      <article className="space-y-1">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-muted-foreground">{book.author}</p>
        <p className="text-muted-foreground">{book.genre}</p>
      </article>
      <Separator />
      <div className="flex flex-col lg:flex-row w-full gap-8">
        <div className="lg:w-1/2 space-y-4">
          <h1>Your Progress</h1>
          <BookProgressCard book={book} />
        </div>
        <UpdateBookForm
          id={book.id}
          book={book}
        />
      </div>
    </div>
  );
}
