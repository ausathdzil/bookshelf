'use client';

import { Button } from '@/components/ui/button';
import { SelectBook } from '@/db/schema';
import { updateBookPages } from '@/lib/actions';
import { useTransition } from 'react';

export default function UpdateCardForm({
  book,
  pagesRead,
}: {
  book: SelectBook;
  pagesRead: number;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={async () => {
        const formData = new FormData();
        formData.append('pagesRead', pagesRead.toString());

        const updateBookById = updateBookPages.bind(
          null,
          book,
          book.id,
          book.userId
        );

        startTransition(async () => {
          await updateBookById(formData);
        });
      }}
    >
      <Button
        type="submit"
        disabled={isPending}
      >
        Update Book
      </Button>
    </form>
  );
}
