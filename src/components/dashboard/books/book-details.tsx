import BookProgressCard from '@/components/dashboard/books/book-progress-card';
import { Button } from '@/components/ui/button';
import { SelectBook } from '@/db/schema';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

export default async function BookDetails({ book }: { book: SelectBook }) {
  return (
    <>
      <section className="w-full flex justify-between items-start">
        <div className="w-full space-y-4">
          <article className="space-y-1">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-muted-foreground">{book.author}</p>
            <p className="text-muted-foreground">{book.genre}</p>
          </article>
        </div>
        <Link href={`/dashboard/books/${book.id}/edit`}>
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
        <p>{book.description}</p>
        <BookProgressCard book={book} />
      </section>
    </>
  );
}
