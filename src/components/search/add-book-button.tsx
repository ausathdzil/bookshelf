'use client';

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
import { OpenLibraryBook } from '@/lib/data';
import { useUser } from '@/lib/user-provider';

export default function AddBookButton({ book }: { book: OpenLibraryBook }) {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
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
        <CreateBookForm OpenLibraryBook={book} />
      </DialogContent>
    </Dialog>
  );
}
